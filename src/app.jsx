import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from 'prop-types';
import "./app.css";

import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./components/pages/HomePage";
import TestingPage from "./components/pages/TestingPage";
import DashboardPage from "./components/pages/DashboardPage";
import PhoneBookPage from "./components/pages/PhoneBookPage";
import AdminRoute from "./components/routes/AdminRoute";
import NotFound from './components/pages/NotFound';

const App = ({ location }) => (
  <div className="app">
    <Header />
    <Switch>
      <Route location={location} path="/" exact component={HomePage} />
      <AdminRoute location={location} path="/dashboard" exact component={DashboardPage} />
      <Route location={location} path="/testing" exact component={TestingPage} />
      <Route location={location} path="/phonebook" exact component={PhoneBookPage} />
      <Route location={location} path="*" component={NotFound} />
    </Switch>
    <Footer />
  </div>
);

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired
};
export default App;
