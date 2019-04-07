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
    searchValue: ""
  };

  componentWillMount() {
    this.resetComponent();
  }

  componentDidMount() {
    const { getPhonebookConnect } = this.props;
    getPhonebookConnect();
  }

  handleSearchChange = (e, { value }) => {
    const { phonebook } = this.props;
    this.setState({ isLoading: true, searchValue: value });

    setTimeout(() => {
      if (value.length < 1) {
        this.resetComponent();
        return;
      }

      const re = new RegExp(_.escapeRegExp(value), "i");
      const isMatch = result =>
        re.test(result.fullName) ||
        result.phones
          .map(row => {
            return re.test(row.number);
          })
          .includes(true);

      this.setState({
        isLoading: false,
        results: _.filter(phonebook, isMatch)
      });
    }, 300);
  };

  resetComponent = () =>
    this.setState({ isLoading: false, results: [], searchValue: "" });

  handleResultSelect = (e, { result }) => {
    this.setState({ searchValue: result.fullName });
    this.handleSearchChange(e, { value: result.fullName });
  };

  concatNumbers = (currentNumbers, addNumber, addNote) => {
    let newNumbers = "";
    let note = "";
    if (addNote) {
      note = ` (${addNote})`;
    }
    if (currentNumbers.length) {
      newNumbers = `${currentNumbers}, ${addNumber}${note}`;
    } else newNumbers = `${addNumber}${note}`;
    return newNumbers;
  };

  render() {
    const { isLoading, searchValue, results } = this.state;
    const { phonebook } = this.props;
    let tempSubdivision = "";
    let phonebookArray = phonebook;
    const resultRenderer = ({ fullName }) => <p>{fullName}</p>;

    if (results.length > 0) phonebookArray = results;

    const phonebookBody = phonebookArray.map(row => {
      let lineNumbers = "";
      let ipNumbers = "";
      let mobileNumbers = "";

      row.phones.forEach(({ typePhone, number, note }) => {
        switch (typePhone) {
          case "line":
            lineNumbers = this.concatNumbers(lineNumbers, number, note);
            break;
          case "IP":
            ipNumbers = this.concatNumbers(ipNumbers, number, note);
            break;
          case "mob":
            mobileNumbers = this.concatNumbers(mobileNumbers, number, note);
            break;
          default:
            break;
        }
      });
      if (row.unit.subdivision !== tempSubdivision) {
        tempSubdivision = row.unit.subdivision;
        return (
          <Table.Row key={row.id}>
            <Table.Cell rowSpan={results.length > 0 ? 1 : row.unit.count_sub}>
              {row.unit.subdivision}
            </Table.Cell>
            <Table.Cell>{row.fullName}</Table.Cell>
            <Table.Cell>{row.position}</Table.Cell>
            <Table.Cell>{lineNumbers}</Table.Cell>
            <Table.Cell>{ipNumbers}</Table.Cell>
            <Table.Cell>{mobileNumbers}</Table.Cell>
            <Table.Cell>{row.room}</Table.Cell>
          </Table.Row>
        );
      }

      return (
        <Table.Row key={row.id}>
          {results.length > 0 ? (
            <Table.Cell>{row.unit.subdivision}</Table.Cell>
          ) : null}
          <Table.Cell>{row.fullName}</Table.Cell>
          <Table.Cell>{row.position}</Table.Cell>
          <Table.Cell>{lineNumbers}</Table.Cell>
          <Table.Cell>{ipNumbers}</Table.Cell>
          <Table.Cell>{mobileNumbers}</Table.Cell>
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
          value={searchValue}
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
          <Table.Body>{phonebookBody}</Table.Body>
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
  getPhonebookConnect: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { getPhonebookConnect: getPhonebook }
)(PhoneBookPage);
