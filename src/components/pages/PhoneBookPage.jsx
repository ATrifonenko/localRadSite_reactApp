import React from "react";
import _ from 'lodash';
import { Table, Search } from "semantic-ui-react";
import api from "../../api";

class PhoneBookPage extends React.Component {
  state = {
    phonebook: [],
    isLoading: false,
    results: [],
    value: ''
  };

  componentWillMount() {
    this.resetComponent()
  }

  componentDidMount() {
    this.getPhoneBook();
  }

  getPhoneBook = () =>
    api.phonebook.getAll().then(res => {
      this.setState({ phonebook: res.phonebook });
    });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) { this.resetComponent(); return };

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = result => re.test(result.fio) || re.test(result.line) || re.test(result.ip) || re.test(result.mobile);

      this.setState({
        isLoading: false,
        results: _.filter(this.state.phonebook, isMatch),
      });
    }, 300);
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' });

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.fio });
    this.handleSearchChange(e, { value: result.fio });
  }

  render() {
    const { isLoading, value, results } = this.state;
    let tempSubdivision = '';
    let phonebookArray = this.state.phonebook;
    const resultRenderer = ({ fio }) => <p>{fio}</p>;

    if (this.state.results.length > 0) phonebookArray = this.state.results;

    const phonebook = phonebookArray.map(row => {
      if (row.subdivision !== tempSubdivision) {
        tempSubdivision = row.subdivision;
        return (
          <Table.Row key={row.id}>
            <Table.Cell rowSpan={(this.state.results.length > 0) ? 1 : row.count_sub}>{row.subdivision}</Table.Cell>
            <Table.Cell>{row.fio}</Table.Cell>
            <Table.Cell>{row.position}</Table.Cell>
            <Table.Cell>{row.line}</Table.Cell>
            <Table.Cell>{row.ip}</Table.Cell>
            <Table.Cell>{row.mobile}</Table.Cell>
            <Table.Cell>{row.room}</Table.Cell>
          </Table.Row>
        )
      }

      return (
        <Table.Row key={row.id}>
          {(this.state.results.length > 0) ? <Table.Cell>{row.subdivision}</Table.Cell> : null}
          <Table.Cell>{row.fio}</Table.Cell>
          <Table.Cell>{row.position}</Table.Cell>
          <Table.Cell>{row.line}</Table.Cell>
          <Table.Cell>{row.ip}</Table.Cell>
          <Table.Cell>{row.mobile}</Table.Cell>
          <Table.Cell>{row.room}</Table.Cell>
        </Table.Row>
      )
    });

    return (
      <div style={{ margin: "10px" }}>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
          results={results}
          value={value}
          resultRenderer={resultRenderer}
          noResultsMessage="Ничего не найдено"
          className="custom-search"
        />
        <Table celled structured padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell rowSpan='2'>Подразделение</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2' width={4}>ФИО</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>Должность</Table.HeaderCell>
              <Table.HeaderCell colSpan='3'>Телефон</Table.HeaderCell>
              <Table.HeaderCell rowSpan='2'>№ каб.</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Стационарный</Table.HeaderCell>
              <Table.HeaderCell>IP</Table.HeaderCell>
              <Table.HeaderCell>Сотовый</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {phonebook}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

export default PhoneBookPage;