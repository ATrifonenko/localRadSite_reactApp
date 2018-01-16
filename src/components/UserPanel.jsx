import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { logout } from "../actions/auth";
import "../css/addNewsForm.css";

const UserPanel = props => (
  <div>
    <h3>Привет {props.name}</h3>
    <Button as={Link} to="/dashboard" content="Панель управления" />
    <Button content="Выйти" onClick={props.logout} />
  </div>
);

function mapStateToPrors(state) {
  return {
    name: state.user.name
  };
}

UserPanel.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
export default connect(mapStateToPrors, { logout })(UserPanel);
