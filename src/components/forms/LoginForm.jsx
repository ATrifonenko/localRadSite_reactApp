import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import "../../css/addNewsForm.css";
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component {
  state = {
    data: {
      login: "",
      password: ""
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
      this.props.submit(this.state.data);
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
        <button className="button">Войти</button>
        <span className="change-form">
          или{" "}
          <button className="change-form" onClick={this.props.changeForm}>
            Зарегистрироваться
          </button>
        </span>
      </form>
    );
  }
}

LoginForm.propTypes = {
  submit: PropTypes.func.isRequired,
  changeForm: PropTypes.func.isRequired
};

export default LoginForm;
