import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { logout } from "../actions/auth";
import "../css/addNewsForm.css";

const UserPanel = ({ name, privilege, logoutConnect }) => (
  <div>
    <h3 className="username">Привет {name}</h3>
    {privilege === "admin" ? (
      <Button as={Link} to="/dashboard" content="Панель управления" />
    ) : (
      ""
    )}
    <Button content="Выйти" onClick={logoutConnect} />
  </div>
);

function mapStateToPrors(state) {
  return {
    name: state.user.name,
    privilege: state.user.privilege
  };
}

UserPanel.propTypes = {
  logoutConnect: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  privilege: PropTypes.string.isRequired
};
export default connect(
  mapStateToPrors,
  { logoutConnect: logout }
)(UserPanel);
