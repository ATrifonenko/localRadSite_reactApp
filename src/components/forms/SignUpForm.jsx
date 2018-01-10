import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
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
    errors: {}
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
      this.props
        .signup(this.state.data)
        .catch(err => this.setState({ errors: err.response.data.errors }));
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
    const { data, errors } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        {errors.login && <InlineError text={errors.login} />}
        <input
          className="enjoy-input"
          type="text"
          name="login"
          placeholder="Логин"
          value={data.login}
          onChange={this.onChange}
        />
        {errors.password && <InlineError text={errors.password} />}
        <input
          className="enjoy-input"
          type="password"
          name="password"
          placeholder="Пароль"
          value={data.password}
          onChange={this.onChange}
        />
        {errors.password2 && <InlineError text={errors.password2} />}
        <input
          className="enjoy-input"
          type="password"
          name="password2"
          placeholder="Пароль еще раз"
          value={data.password2}
          onChange={this.onChange}
        />
        {errors.name && <InlineError text={errors.name} />}
        <input
          className="enjoy-input"
          type="text"
          name="name"
          placeholder="Ваше имя"
          value={data.name}
          onChange={this.onChange}
        />
        {errors.global && <InlineError text={errors.global} />}
        <button className="button">Зарегистрироваться</button>
        <span className="change-form">
          или{" "}
          <button className="change-form" onClick={this.props.changeForm}>
            Войти
          </button>
        </span>
      </form>
    );
  }
}

SignUpForm.propTypes = {
  signup: PropTypes.func.isRequired,
  changeForm: PropTypes.func.isRequired
};

export default connect(null, { signup, changeForm })(SignUpForm);
