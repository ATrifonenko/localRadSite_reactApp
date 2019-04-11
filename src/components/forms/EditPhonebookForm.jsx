import React from "react";
// import PropTypes from "prop-types";
import _ from "lodash";
import { Form } from "semantic-ui-react";
import { connect } from "react-redux";
import InlineError from "../messages/InlineError";

const NumbersBlock = ({ numbers, options, onChangeNumber }) => {
  return numbers.map((number, index) => (
    <Form.Group key={number.number}>
      <Input
        label="Номер телефона"
        placeholder="Номер телефона"
        width={3}
        name="number"
        value={number.number}
        onChange={e => onChangeNumber(e, index)}
      />
      <Form.Select
        width={3}
        label="Тип телефона"
        name="typePhone"
        // value={number.typePhone}
        options={options}
        // onChange={this.onChangeNumber(index)}
      />
      <Form.Checkbox
        style={{ marginTop: "33px" }}
        label="Факс"
        // onChange={this.onChangeNumber(index)}
      />
      <Form.Button
        style={{ marginTop: "27px", boxShadow: "none !important" }}
        basic
        size="mini"
        color="red"
      >
        Удалить номер
      </Form.Button>
    </Form.Group>
  ));
};

class EditPhonebookForm extends React.Component {
  state = {
    data: {
      firstName: "",
      lastName: "",
      patronymic: "",
      position: "",
      subdivision: "",
      numbers: [{ number: "", typePhone: "line", fax: false }]
    },
    errors: {},
    loading: false
  };

  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      data: { ...prevState.data, [e.target.name]: e.target.value }
    }));
  };

  onChangeNumber = (e, index) => {
    e.persist();
    console.log(index);
    const { data } = this.state;
    const temp = data.numbers;
    temp[index].number = e.target.value;
    console.log(temp);
    this.setState(prevState => ({
      data: { ...prevState.data, numbers: temp }
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.data);
    const { data } = this.state;
    const errors = this.validate(data);
    this.setState({ errors });
    if (_.isEmpty(errors)) {
      this.setState({ loading: true });
      // this.props
      //   .signup(this.state.data)
      //   .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
    }
  };

  addNumber = () => {
    const { data } = this.state;
    const number = { number: "", typePhone: "line", fax: false };
    data.numbers.push(number);
    const numbersNew = data.numbers;
    this.setState(prevState => ({
      data: { ...prevState.data, numbers: numbersNew }
    }));
  };

  validate = data => {
    const errors = {};
    if (
      !data.login ||
      !/^(?=.{3,20}$)(?![_.-])(?!.*[_.-]{2})[a-zA-Z0-9_-]+([^._-])$/.test(
        data.login
      )
    )
      errors.login = "Логин не введен";
    if (
      !data.password ||
      !/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{5,})\S$/.test(data.password)
    )
      errors.password = "Пароль не введен или введен не верно";
    if (!data.password2) errors.password2 = "Не введен пароль для проверки";
    if (data.password !== data.password2) {
      errors.password = "Пароли не совпадают";
      errors.password2 = "Пароли не совпадают";
    }
    if (!data.name) errors.name = "Как к Вам обращаться?";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    const options = [
      { key: "line", text: "Аналог", value: "line" },
      { key: "ip", text: "Цифровой(IP)", value: "IP" },
      { key: "mob", text: "Сотовый", value: "mob" }
    ];

    // const numberBlock = data.numbers.map((number, index) => (
    //   <Form.Group key={number.number}>
    //     <Form.Input
    //       label="Номер телефона"
    //       placeholder="Номер телефона"
    //       width={3}
    //       name="number"
    //       value={number.number}
    //       onChange={e => this.onChangeNumber(e, index)}
    //     />
    //     <Form.Select
    //       width={3}
    //       label="Тип телефона"
    //       name="typePhone"
    //       // value={number.typePhone}
    //       options={options}
    //       // onChange={this.onChangeNumber(index)}
    //     />
    //     <Form.Checkbox
    //       style={{ marginTop: "33px" }}
    //       label="Факс"
    //       // onChange={this.onChangeNumber(index)}
    //     />
    //     <Form.Button
    //       style={{ marginTop: "27px", boxShadow: "none !important" }}
    //       basic
    //       size="mini"
    //       color="red"
    //     >
    //       Удалить номер
    //     </Form.Button>
    //   </Form.Group>
    // ));
    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Group>
          <Form.Input
            label="Фамилия"
            placeholder="Фамилия"
            width={6}
            name="lastName"
            value={data.lastName}
            onChange={this.onChange}
            error={!!errors.lastName}
          />
          <Form.Input
            label="Имя"
            placeholder="Имя"
            width={4}
            name="firstName"
            value={data.firstName}
            onChange={this.onChange}
            error={!!errors.firstName}
          />
          <Form.Input
            label="Отчество"
            placeholder="Отчество"
            width={6}
            name="patronymic"
            value={data.patronymic}
            onChange={this.onChange}
            error={!!errors.patronymic}
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
            error={!!errors.position}
          />
          <Form.Select
            width={6}
            label="Подразделение"
            name="subdivision"
            value={data.subdivision}
            options={options}
            placeholder="Подразделение"
            error={!!errors.subdivision}
          />
        </Form.Group>
        <NumbersBlock
          numbers={data.numbers}
          onChangeNumber={this.onChangeNumber}
          options={options}
        />
        <Form.Button basic size="mini" color="blue" onClick={this.addNumber}>
          Добавить номер
        </Form.Button>

        {errors.global && <InlineError text={errors.global} />}
        <Form.Button primary>Добавить</Form.Button>
      </Form>
    );
  }
}

// EditPhonebookForm.propTypes = {

// };

export default connect(
  null,
  {}
)(EditPhonebookForm);
