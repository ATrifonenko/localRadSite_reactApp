import React from "react";
import NewsList from "../newsList";
import LoginForm from "../forms/LoginForm";
import SignUpForm from "../forms/SignUpForm";
import AddNewsForm from "../forms/addNewsForm";

class HomePage extends React.Component {
  state = {
    news: [],
    isLoginForm: true
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
    console.log(data);
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

export default HomePage;
