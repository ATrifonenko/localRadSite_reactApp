import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const RootRoute = ({ privilege, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      privilege === "root" ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

function mapStateToProps(state) {
  return {
    privilege: state.user.privilege || ""
  };
}

RootRoute.propTypes = {
  component: PropTypes.func.isRequired,
  privilege: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(RootRoute);
