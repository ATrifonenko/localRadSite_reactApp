import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

const EditorRoute = ({ privilege, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      privilege === "user" ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

function mapStateToProps(state) {
  return {
    privilege: state.user.privilege || ""
  };
}

EditorRoute.propTypes = {
  component: PropTypes.func.isRequired,
  privilege: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(EditorRoute);
