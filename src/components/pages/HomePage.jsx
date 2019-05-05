import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import fileDownload from "../../utils/fileDownload";
import NewsList from "../newsList";
import SideBar from "../SideBar";
import api from "../../api";
import { firstPageNews, otherPageNews } from "../../actions/news";

class HomePage extends React.Component {
  componentDidMount() {
    const { match } = this.props;
    if (match.params.id) {
      this.getNewsPage(match.params.id);
    } else this.getNewsPage("1");
  }

  componentDidUpdate(prevProps) {
    const { match, location } = this.props;
    if (match.params.id) {
      this.getNewsPage(match.params.id);
    } else this.getNewsPage("1");
    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  getNewsPage = page => {
    api.main.getNewsPage(page).then(res => {
      const { firstPageNewsConnect, otherPageNewsConnect } = this.props;
      if (page === "1") {
        firstPageNewsConnect(res);
      } else otherPageNewsConnect(res);
    });
    // .catch(err => this.props.history.push("/"));
  };

  onPageChange = (e, { activePage }) => {
    const { history } = this.props;
    history.push(`/news/${activePage}`);
  };

  getFile = (filePath, fileName) =>
    api.main.getFile(filePath).then(res => fileDownload(res, fileName));

  render() {
    const { match } = this.props;
    return (
      <div className="main-wrapper">
        <NewsList
          getFile={this.getFile}
          onPageChange={this.onPageChange}
          currentPage={match.params.id}
        />
        <SideBar />
      </div>
    );
  }
}

HomePage.propTypes = {
  firstPageNewsConnect: PropTypes.func.isRequired,
  otherPageNewsConnect: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired
};

export default connect(
  null,
  { firstPageNewsConnect: firstPageNews, otherPageNewsConnect: otherPageNews }
)(HomePage);
