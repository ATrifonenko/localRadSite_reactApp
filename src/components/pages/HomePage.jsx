import React from "react";
import { connect } from "react-redux";
import NewsList from "../newsList";
import SideBar from "../SideBar";
import api from "../../api";

class HomePage extends React.Component {
  state = {
    news: []
  };

  componentDidMount() {
    this.getMain();
  }

  getMain = () =>
    api.main.getMain().then(res => {
      this.setState({ news: res.news });
    });

  render() {
    return (
      <div className="main-wrapper">
        <NewsList news={this.state.news} />
        <SideBar />
      </div>
    );
  }
}

export default connect(null)(HomePage);
