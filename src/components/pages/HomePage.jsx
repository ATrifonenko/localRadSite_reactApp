import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NewsList from "../newsList";
import LoginForm from "../forms/LoginForm";
import SignUpForm from "../forms/SignUpForm";
import AddNewsForm from "../forms/addNewsForm";
import { login } from "../../actions/auth";

class HomePage extends React.Component {
  state = {
    news: [],
    isLoginForm: true,
    logged: false
  };

  componentDidMount() {
    this.getMain();
  }

  getMain = () => {
    fetch("//radmvd.local/api/getMain.php")
      .then(response => response.json())
      .then(data => {
        this.setState({
          news: data.news,
          logged: data.logged
        });
      })
      .catch(error => console.log(error));
  };

  changeForm = e => {
    e.preventDefault();
    this.setState({
      isLoginForm: !this.state.isLoginForm
    });
  };

  submit = data => {
    this.props.login(data).then(console.log(""));
  };

  render() {
    const form = this.state.isLoginForm ? (
      <LoginForm submit={this.submit} changeForm={this.changeForm} />
    ) : (
      <SignUpForm submit={this.submit} changeForm={this.changeForm} />
    );
    return (
      <div className="app">
        {this.state.logged ? <AddNewsForm /> : form}
        <NewsList news={this.state.news} />
      </div>
    );
  }
}

HomePage.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(null, { login })(HomePage);
