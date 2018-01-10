import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../actions/auth";

const UserPanel = props => (
  <div>
    <h3>Привет {props.name}</h3>
    <button onClick={props.logout}>Выйти</button>
  </div>
);

UserPanel.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
export default connect(null, { logout })(UserPanel);
