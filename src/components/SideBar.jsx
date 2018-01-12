import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoginForm from "./forms/LoginForm";
import SignUpForm from "./forms/SignUpForm";
import UserPanel from "./UserPanel";
import "../css/sideBar.css";

const SideBar = ({ logged, isLoginForm }) => {
  let userPanel;
  logged
    ? (userPanel = <UserPanel />)
    : (userPanel = isLoginForm ? <LoginForm /> : <SignUpForm />);
  return <div className="sidebar">{userPanel}</div>;
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
  isLoginForm: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(SideBar);
