import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import "../css/addNewsForm.css";

const UserPanel = props => (
  <div>
    <h3>Привет {props.name}</h3>
    <Link to="/dashboard">Админка</Link>
    <button className="button">Добавить новость</button>
    <button className="button">Тестирование</button>
    <button className="button" onClick={props.logout}>
      Выйти
    </button>
  </div>
);

UserPanel.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};
export default connect(null, { logout })(UserPanel);
