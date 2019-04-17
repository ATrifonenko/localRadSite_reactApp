import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Form, Message, Dropdown, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  getPhonebook,
  editPhoneBook,
  delPerson
} from "../../actions/phonebook";

const PhonesBlock = ({
  phones,
  options,
  errors,
  onChangeNumber,
  onDelNumber
}) => {
  return phones.map((number, index) => (
    <Form.Group key={index}>
      <Form.Input
        label="Номер телефона"
        placeholder="Номер телефона"
        width={3}
        name="number"
        value={number.number}
        onChange={e => onChangeNumber(e, index)}
        error={errors[`number${index}`]}
      />
      <Form.Select
        width={3}
        label="Тип телефона"
        name="typePhone"
        value={number.typePhone}
        options={options}
        onChange={(e, { value }) => onChangeNumber(e, index, value)}
      />
      <Form.Checkbox
        style={{ marginTop: "33px" }}
        label="Факс"
        checked={number.note != null}
        onChange={(e, { checked }) => onChangeNumber(e, index, checked)}
      />
      {phones.length > 1 && (
        <Form.Button
          style={{ marginTop: "27px" }}
          basic
          size="mini"
          color="red"
          type="button"
          onClick={e => onDelNumber(e, index)}
        >
          Удалить номер
        </Form.Button>
      )}
    </Form.Group>
  ));
};
class EditPhonebookForm extends React.Component {
  state = {
    data: {
      id: "",
      firstName: "",
      lastName: "",
      patronymic: "",
      position: "",
      subdivision: "",
      phones: [{ number: "", typePhone: "line", note: null }]
    },
    errors: "",
    success: "",
    editing: false,
    dropdown: {
      isLoading: true,
      personSelected: "",
      person: [{ key: "", text: "", value: "" }],
      subdivision: [{ key: "", text: "", value: "" }]
    }
  };

  componentWillMount() {
    const { getPhonebookConnect } = this.props;
    getPhonebookConnect().then(this.onSetOptionsDropdown);
  }

  clearState = success => {
    this.setState(prevState => ({
      data: {
        id: "",
        firstName: "",
        lastName: "",
        patronymic: "",
        position: "",
        subdivision: "",
        phones: [{ number: "", typePhone: "line", note: null }]
      },
      dropdown: { ...prevState.dropdown, personSelected: "" },
      errors: "",
      success,
      editing: false
    }));
  };

  onSetOptionsDropdown = () => {
    const { phonebook, subdivision } = this.props;
    const person = [];
    const unit = [];
    phonebook.forEach(row =>
      person.push({
        key: row.id,
        text: row.fullName,
        value: row.id
      })
    );
    subdivision.forEach(row =>
      unit.push({
        key: row.id,
        text: row.subdivision,
        value: row.id
      })
    );
    this.setState({
      dropdown: { isLoading: false, person, subdivision: unit }
    });
  };

  onSelectPerson = (e, { value }) => {
    const { phonebook } = this.props;
    const selectPerson = phonebook.find(person => value === person.id);
    if (!selectPerson) {
      this.clearState();
    } else {
      const phonesPerson = selectPerson.phones.map(a => ({ ...a }));
      this.setState(prevState => ({
        data: {
          id: selectPerson.id,
          firstName: selectPerson.firstName,
          lastName: selectPerson.lastName,
          patronymic: selectPerson.patronymic,
          position: selectPerson.position,
          subdivision: selectPerson.unit.id,
          phones: phonesPerson
        },
        dropdown: { ...prevState.dropdown, personSelected: value },
        editing: true
      }));
    }
  };

  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      data: { ...prevState.data, [e.target.name]: e.target.value }
    }));
  };

  onChangeSubdivision = (e, { value }) => {
    this.setState(prevState => ({
      data: { ...prevState.data, subdivision: value }
    }));
  };

  onChangeNumber = (e, index, typeOrFax) => {
    e.persist();
    const { data } = this.state;
    const temp = data.phones;
    if (typeof typeOrFax === "string") {
      temp[index].typePhone = typeOrFax;
    } else if (typeof typeOrFax === "boolean") {
      temp[index].note = typeOrFax ? "Факс" : null;
    } else temp[index].number = e.target.value;
    this.setState(prevState => ({
      data: { ...prevState.data, phones: temp }
    }));
  };

  onDelNumber = (e, index) => {
    const { data } = this.state;
    const temp = data.phones;
    temp.splice(index, 1);
    this.setState(prevState => ({
      data: { ...prevState.data, phones: temp }
    }));
  };

  onDelPerson = () => {
    const { data } = this.state;
    const { delPersonConnect } = this.props;
    delPersonConnect({ id: data.id })
      .then(() => {
        this.onSetOptionsDropdown();
        this.clearState("Сотрудник удален из справочника");
      })
      .catch(err => this.setState({ errors: err.response.data.errors }));
  };

  onSubmit = () => {
    const { data } = this.state;
    const { editPhoneBookConnect } = this.props;
    const errors = this.validate(data);
    this.setState({ errors });
    if (_.isEmpty(errors)) {
      editPhoneBookConnect(data)
        .then(() => {
          this.onSetOptionsDropdown();
          this.clearState("Данные были успешно сохранены");
        })
        .catch(err => this.setState({ errors: err.response.data.errors }));
    }
  };

  addNumber = () => {
    const { data } = this.state;
    const number = { number: "", typePhone: "line", note: null };
    data.phones.push(number);
    const phonesNew = data.phones;
    this.setState(prevState => ({
      data: { ...prevState.data, phones: phonesNew }
    }));
  };

  validate = data => {
    const errors = {};
    data.phones.forEach((el, index) => {
      if (
        !el.number ||
        !/^(?:\+?(\d{1,3}))?([- (]*(\d{3})[- )]*)?((\d{1,3})[- ]*(\d{2,4})(?:[-x ]*(\d+))?)\s*$/.test(
          el.number
        )
      )
        errors[`number${index}`] = true;
    });
    if (
      !data.firstName ||
      !/^[A-ЯЁ][а-яё]+[-, ]?([A-ЯЁ]?[а-яё]+)?$/.test(data.firstName)
    )
      errors.firstName = true;
    if (
      !data.lastName ||
      !/^[A-ЯЁ][а-яё]+[-, ]?([A-ЯЁ]?[а-яё]+)?$/.test(data.lastName)
    )
      errors.lastName = true;
    if (
      !data.patronymic ||
      !/^[A-ЯЁ][а-яё]+[-, ]?([A-ЯЁ]?[а-яё]+)?$/.test(data.patronymic)
    )
      errors.patronymic = true;
    if (!data.position) errors.position = true;
    if (!data.subdivision) errors.subdivision = true;
    if (!_.isEmpty(errors)) {
      errors.msgHeader = "Необходимо заполнить все поля правильно!";
      errors.msg =
        "Ф.И.О. с большой буквы. Номер телефона только цифры (разрешены пробелы, тире, скобки).";
    }
    return errors;
  };

  render() {
    const { data, errors, success, editing, dropdown } = this.state;
    const options = [
      { key: "line", text: "Аналог", value: "line" },
      { key: "ip", text: "Цифровой(IP)", value: "IP" },
      { key: "mob", text: "Сотовый", value: "mob" }
    ];

    return (
      <div className="dashboard">
        <Dropdown
          search
          selection
          clearable
          fluid
          selectOnBlur={false}
          placeholder="Для редактирования выберите сотрудника"
          noResultsMessage="Никого не найдено"
          value={dropdown.personSelected}
          options={dropdown.person}
          onChange={this.onSelectPerson}
        />
        <Message
          info
          content="Для редактирования уже существующей записи выберите сотрудника из списка выше. Для добавления новой - заполните форму."
        />
        <Form onSubmit={this.onSubmit} error={!!errors} success={!!success}>
          <Form.Group>
            <Form.Input
              label="Фамилия"
              placeholder="Фамилия"
              width={6}
              name="lastName"
              value={data.lastName}
              onChange={this.onChange}
              error={errors.lastName}
            />
            <Form.Input
              label="Имя"
              placeholder="Имя"
              width={4}
              name="firstName"
              value={data.firstName}
              onChange={this.onChange}
              error={errors.firstName}
            />
            <Form.Input
              label="Отчество"
              placeholder="Отчество"
              width={6}
              name="patronymic"
              value={data.patronymic}
              onChange={this.onChange}
              error={errors.patronymic}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input
              label="Должность"
              placeholder="Должность"
              width={10}
              name="position"
              value={data.position}
              onChange={this.onChange}
              error={errors.position}
            />
            <Form.Dropdown
              width={6}
              selection
              selectOnBlur={false}
              label="Подразделение"
              name="subdivision"
              value={data.subdivision}
              options={dropdown.subdivision}
              placeholder="Подразделение"
              onChange={this.onChangeSubdivision}
              error={errors.subdivision}
            />
          </Form.Group>
          <PhonesBlock
            errors={errors}
            phones={data.phones}
            onChangeNumber={this.onChangeNumber}
            options={options}
            onDelNumber={this.onDelNumber}
          />
          <Form.Button
            basic
            size="mini"
            color="blue"
            onClick={this.addNumber}
            type="button"
          >
            Добавить номер
          </Form.Button>
          <Message success header={success} />
          <Message error header={errors.msgHeader} content={errors.msg} />
          <Form.Group widths="equal">
            <Form.Button primary compact floated="left">
              Сохранить
            </Form.Button>
            {editing ? (
              <Form.Button
                color="red"
                icon
                basic
                compact
                labelPosition="right"
                floated="right"
                type="button"
                onClick={this.onDelPerson}
              >
                Удалить из справочника
                <Icon name="warning" />
              </Form.Button>
            ) : (
              ""
            )}
          </Form.Group>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    phonebook: state.phonebook.phonebook,
    subdivision: state.phonebook.subdivision
  };
}

EditPhonebookForm.propTypes = {
  phonebook: PropTypes.arrayOf(PropTypes.object).isRequired,
  subdivision: PropTypes.arrayOf(PropTypes.object).isRequired,
  getPhonebookConnect: PropTypes.func.isRequired,
  editPhoneBookConnect: PropTypes.func.isRequired,
  delPersonConnect: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  {
    getPhonebookConnect: getPhonebook,
    editPhoneBookConnect: editPhoneBook,
    delPersonConnect: delPerson
  }
)(EditPhonebookForm);
