import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NewsList from "../newsList";
import SideBar from "../SideBar";
import api from "../../api";
import allNews from "../../actions/news";

class HomePage extends React.Component {

  componentWillMount() {
    this.getMain();
  }

  getMain = () =>
    api.main.getMain().then(res => this.props.allNews(res.news));

  render() {
    return (
      <div className="main-wrapper">
        <NewsList />
        <SideBar />
      </div>
    );
  }
}

HomePage.propTypes = {
  allNews: PropTypes.func.isRequired
};

export default connect(null, { allNews })(HomePage);
