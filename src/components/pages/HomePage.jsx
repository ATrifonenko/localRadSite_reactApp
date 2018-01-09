import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { userLoggedIn } from "../../actions/auth";
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
      this.props.userLoggedIn(res.user);
      this.setState({ news: res.news });
    });

  render() {
    return (
      <div className="main-wrapper">
        {<NewsList news={this.state.news} />}
        <SideBar />
      </div>
    );
  }
}

HomePage.propTypes = {
  userLoggedIn: PropTypes.func.isRequired
};

export default connect(null, { userLoggedIn })(HomePage);
