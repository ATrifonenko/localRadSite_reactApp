import React from "react";
// import PropTypes from "prop-types";
import _ from "lodash";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import InlineError from "../messages/InlineError";

class EditPhonebookForm extends React.Component {
  state = {
    data: {},
    errors: {},
    loading: false
  };

  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      data: { ...prevState.data, [e.target.name]: e.target.value }
    }));
  };

  onSubmit = e => {
    e.preventDefault();
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

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.fio}>
          <input
            type="text"
            name="fio"
            placeholder="ФИО (полностью)"
            value={data.fio}
            onChange={this.onChange}
          />
          {errors.fio && <InlineError text={errors.fio} />}
        </Form.Field>
        <Form.Field error={!!errors.position}>
          <input
            type="text"
            name="position"
            placeholder="Должность"
            value={data.position}
            onChange={this.onChange}
          />
          {errors.position && <InlineError text={errors.position} />}
        </Form.Field>
        <Form.Field error={!!errors.subdivision}>
          <input
            type="text"
            name="subdivision"
            placeholder="Подразделение"
            value={data.subdivision}
            onChange={this.onChange}
          />
          {errors.subdivision && <InlineError text={errors.subdivision} />}
        </Form.Field>
        <Form.Field error={!!errors.linePhone}>
          <label>Номер телефона</label>
          <input
            type="text"
            name="linePhone"
            placeholder="Номер телефона"
            value={data.linePhone}
            onChange={this.onChange}
          />
          {errors.linePhone && <InlineError text={errors.linePhone} />}
        </Form.Field>
        <Form.Field error={!!errors.ipPhone}>
          <label>Номер IP телефона</label>
          <input
            type="text"
            name="ipPhone"
            placeholder="Номер IP телефона"
            value={data.ipPhone}
            onChange={this.onChange}
          />
          {errors.ipPhone && <InlineError text={errors.ipPhone} />}
        </Form.Field>
        <Form.Field error={!!errors.mobilePhone}>
          <label>Номер служебного сотового</label>
          <input
            type="text"
            name="mobilePhone"
            placeholder="Номер служебного сотового"
            value={data.mobilePhone}
            onChange={this.onChange}
          />
          {errors.mobilePhone && <InlineError text={errors.mobilePhone} />}
        </Form.Field>
        {errors.global && <InlineError text={errors.global} />}
        <Button primary>Добавить</Button>
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
