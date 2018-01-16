import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import "../../css/addNewsForm.css";
import InlineError from "../messages/InlineError";
import { signup } from "../../actions/auth";
import { changeForm } from "../../actions/sidebar";

class SignUpForm extends React.Component {
  state = {
    data: {
      login: "",
      password: "",
      password2: "",
      name: ""
    },
    errors: {},
    loading: false
  };

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (_.isEmpty(errors)) {
      this.setState({ loading: true })
      this.props
        .signup(this.state.data).then(() => this.setState({ loading: false }))
        .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
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
        <Form.Field error={!!errors.login}>
          <input
            type="text"
            name="login"
            placeholder="Логин"
            value={data.login}
            onChange={this.onChange}
          />
          {errors.login && <InlineError text={errors.login} />}
        </Form.Field>
        <Form.Field error={!!errors.password}>
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={data.password}
            onChange={this.onChange}
          />
          {errors.password && <InlineError text={errors.password} />}
        </Form.Field>
        <Form.Field error={!!errors.password2}>
          <input
            type="password"
            name="password2"
            placeholder="Пароль еще раз"
            value={data.password2}
            onChange={this.onChange}
          />
          {errors.password2 && <InlineError text={errors.password2} />}
        </Form.Field>
        <Form.Field error={!!errors.name}>
          <input
            type="text"
            name="name"
            placeholder="Фамилия И.О."
            value={data.name}
            onChange={this.onChange}
          />
          {errors.name && <InlineError text={errors.name} />}
        </Form.Field>
        {errors.global && <InlineError text={errors.global} />}
        <Button primary>Зарегистрироваться</Button>
        <span className="change-form">
          или{" "}
          <button className="change-form" onClick={this.props.changeForm}>
            Войти
          </button>
        </span>
      </Form>
    );
  }
}

SignUpForm.propTypes = {
  signup: PropTypes.func.isRequired,
  changeForm: PropTypes.func.isRequired
};

export default connect(null, { signup, changeForm })(SignUpForm);
