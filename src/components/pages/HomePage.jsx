import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import fileDownload from "../../utils/fileDownload";
import NewsList from "../newsList";
import SideBar from "../SideBar";
import api from "../../api";
import allNews from "../../actions/news";

class HomePage extends React.Component {
  componentWillMount() {
    this.getMain();
  }

  getMain = () =>
    api.main.getMain().then(res => {
      const { allNewsConnect } = this.props;
      allNewsConnect(res.news);
    });

  getFile = (filePath, fileName) =>
    api.main.getFile(filePath).then(res => fileDownload(res, fileName));

  render() {
    return (
      <div className="main-wrapper">
        <NewsList getFile={this.getFile} />
        <SideBar />
      </div>
    );
  }
}

HomePage.propTypes = {
  allNewsConnect: PropTypes.func.isRequired
};

export default connect(
  null,
  { allNewsConnect: allNews }
)(HomePage);
