import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import _ from "lodash";
import { Table, Search } from "semantic-ui-react";
import { getPhonebook } from "../../actions/phonebook";
import "../../css/phoneBook.css";

class PhoneBookPage extends React.Component {
  state = {
    isLoading: false,
    results: [],
    value: ""
  };

  componentWillMount() {
    this.resetComponent();
  }

  componentDidMount() {
    this.props.getPhonebook();
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) {
        this.resetComponent();
        return;
      }

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = result =>
        re.test(result.fullName) ||
        re.test(result.line) ||
        re.test(result.ip) ||
        re.test(result.mobile);

      this.setState({
        isLoading: false,
        results: _.filter(this.props.phonebook, isMatch)
      });
    }, 300);
  };

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], value: "" });

  handleResultSelect = (e, { result }) => {
    this.setState({ value: result.fullName });
    this.handleSearchChange(e, { value: result.fullName });
  };

  render() {
    const { isLoading, value, results } = this.state;
    let tempSubdivision = "";
    let phonebookArray = this.props.phonebook;
    const resultRenderer = ({ fullName }) => <p>{fullName}</p>;

    if (this.state.results.length > 0) phonebookArray = this.state.results;

    const phonebook = phonebookArray.map(row => {
      if (row.unit.subdivision !== tempSubdivision) {
        tempSubdivision = row.unit.subdivision;
        return (
          <Table.Row key={row.id}>
            <Table.Cell
              rowSpan={this.state.results.length > 0 ? 1 : row.unit.count_sub}
            >
              {row.unit.subdivision}
            </Table.Cell>
            <Table.Cell>{row.fullName}</Table.Cell>
            <Table.Cell>{row.position}</Table.Cell>
            <Table.Cell>{row.line}</Table.Cell>
            <Table.Cell>{row.ip}</Table.Cell>
            <Table.Cell>{row.mobile}</Table.Cell>
            <Table.Cell>{row.room}</Table.Cell>
          </Table.Row>
        );
      }

      return (
        <Table.Row key={row.id}>
          {this.state.results.length > 0 ? (
            <Table.Cell>{row.unit.subdivision}</Table.Cell>
          ) : null}
          <Table.Cell>{row.fullName}</Table.Cell>
          <Table.Cell>{row.position}</Table.Cell>
          <Table.Cell>{row.line}</Table.Cell>
          <Table.Cell>{row.ip}</Table.Cell>
          <Table.Cell>{row.mobile}</Table.Cell>
          <Table.Cell>{row.room}</Table.Cell>
        </Table.Row>
      );
    });

    return (
      <div style={{ margin: "10px" }}>
        <Search
          loading={isLoading}
          onResultSelect={this.handleResultSelect}
          onSearchChange={_.debounce(this.handleSearchChange, 500, {
            leading: true
          })}
          results={results}
          value={value}
          resultRenderer={resultRenderer}
          noResultsMessage="Ничего не найдено"
          className="custom-search"
        />
        <Table celled structured padded>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell rowSpan="2">Подразделение</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2" width={4}>
                ФИО
              </Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">Должность</Table.HeaderCell>
              <Table.HeaderCell colSpan="3">Телефон</Table.HeaderCell>
              <Table.HeaderCell rowSpan="2">№ каб.</Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell>Стационарный</Table.HeaderCell>
              <Table.HeaderCell>IP</Table.HeaderCell>
              <Table.HeaderCell>Сотовый</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{phonebook}</Table.Body>
        </Table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    phonebook: state.phonebook.phonebook
  };
}

PhoneBookPage.propTypes = {
  phonebook: PropTypes.arrayOf(PropTypes.object).isRequired,
  getPhonebook: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { getPhonebook })(PhoneBookPage);
