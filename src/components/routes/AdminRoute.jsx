import React from 'react';
import { connect } from "react-redux"
import PropTypes from 'prop-types';
import { Route, Redirect } from "react-router-dom"

const AdminRoute = ({ privilege, component: Component, ...rest }) => (
  <Route {...rest} render={props => privilege === "admin" ? <Component {...props} /> : <Redirect to="/" />} />
);

function mapStateToProps(state) {
  return {
    privilege: state.user.privilege || ""
  }
}

AdminRoute.propTypes = {
  component: PropTypes.func.isRequired,
  privilege: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(AdminRoute);