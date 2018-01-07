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
      password2: ""
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
      this.props.signup(this.state.data);
    }

    // const data = new FormData();
    // const state_data = this.state.isLoginForm
    //   ? {
    //       login: this.state.data.login,
    //       password: this.state.data.password
    //     }
    //   : {
    //       login: this.state.data.login,
    //       password: this.state.data.password,
    //       password2: this.state.data.password2
    //     };
    // data.append("json", JSON.stringify(state_data));
    // const query = {
    //   method: "POST",
    //   body: data
    // };
    // const path = this.state.isLoginForm ? "login.php" : "signup.php";
    // fetch("//radmvd.local/api/" + path, query)
    //   .then(response => response.json())
    //   .then(data => {
    //     this.props.onChangeForm(data.logged);
    //   })
    //   .catch(error => console.log(error));
  };

  validate = data => {
    const errors = {};
    if (!data.login) errors.login = "Не введен логин";
    if (!data.password) errors.password = "Не введен пароль";
    if (!data.password2) errors.password2 = "Не введен пароль 2";
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
