import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { changeForm } from "../../actions/sidebar";
import "../../css/addNewsForm.css";
import InlineError from "../messages/InlineError";

class LoginForm extends React.Component {
  state = {
    data: {
      login: "",
      password: ""
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
      this.setState({
        loading: true
      });
      this.props
        .login(this.state.data).then(() => this.setState({ loading: false }))
        .catch(err => this.setState({ errors: err.response.data.errors, loading: false }));
    }
  };

  validate = data => {
    const errors = {};
    if (!data.login) errors.login = "Логин не введен ";
    if (!data.password) errors.password = "Пароль не введен";
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
        {errors.global && <InlineError text={errors.global} />}
        <Button primary>Войти</Button>
        <span className="change-form">
          или{" "}
          <button className="change-form" onClick={this.props.changeForm}>
            Зарегистрироваться
          </button>
        </span>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  changeForm: PropTypes.func.isRequired
};

export default connect(null, { login, changeForm })(LoginForm);
