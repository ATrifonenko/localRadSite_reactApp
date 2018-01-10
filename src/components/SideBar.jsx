import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginForm from "./forms/LoginForm";
import SignUpForm from "./forms/SignUpForm";
import UserPanel from "./UserPanel";
import "../css/sideBar.css";

const SideBar = ({ logged, name, isLoginForm }) => {
  let form;
  if (logged) {
    form = <UserPanel name={name} />;
  } else if (isLoginForm) {
    form = <LoginForm />;
  } else form = <SignUpForm />;

  return <div className="sidebar">{form}</div>;
};

function mapStateToProps(state) {
  return {
    logged: !!state.user.logged,
    name: state.user.name,
    isLoginForm: !!state.sidebar.isLoginForm
  };
}

SideBar.propTypes = {
  logged: PropTypes.bool.isRequired,
  isLoginForm: PropTypes.bool.isRequired,
  name: PropTypes.string
};

export default connect(mapStateToProps)(SideBar);
