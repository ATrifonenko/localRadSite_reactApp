import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginForm from "./forms/LoginForm";
import SignUpForm from "./forms/SignUpForm";
import "../css/sideBar.css";

const SideBar = ({ logged, isLoginForm }) => {
  let form;
  if (logged) {
    form = <addNewsForm />;
  } else if (isLoginForm) {
    form = <LoginForm />;
  } else form = <SignUpForm />;

  return <div className="sidebar">{form}</div>;
};

function mapStateToProps(state) {
  return {
    logged: !!state.user.logged,
    isLoginForm: !!state.sidebar.isLoginForm
  };
}

SideBar.propTypes = {
  logged: PropTypes.bool.isRequired,
  isLoginForm: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(SideBar);
