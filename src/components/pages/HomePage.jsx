import React from "react";
import NewsList from "../newsList";
import SideBar from "../SideBar";

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
          news: data.news
        });
      })
      .catch();
  };

  changeForm = e => {
    e.preventDefault();
    this.setState({
      isLoginForm: !this.state.isLoginForm
    });
  };

  render() {
    return (
      <div className="main-wrapper">
        {<NewsList news={this.state.news} />}
        <SideBar />
      </div>
    );
  }
}

export default HomePage;
