import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import "./app.css";

import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./components/pages/HomePage";
import Dashboard from "./components/pages/Dashboard";
import PhoneBookPage from "./components/pages/PhoneBookPage";
import AdminRoute from "./components/routes/AdminRoute";
import EditorRoute from "./components/routes/EditorRoute";
import RootRoute from "./components/routes/RootRoute";
import NotFound from "./components/pages/NotFound";

const App = ({ location }) => (
  <div className="app">
    <Header />
    <Switch>
      <Route location={location} path="/" exact component={HomePage} />
      <Route location={location} path="/news" exact component={HomePage} />
      <Route location={location} path="/news/:id" exact component={HomePage} />
      <EditorRoute
        location={location}
        path="/dashboard"
        exact
        component={Dashboard}
      />
      <EditorRoute
        location={location}
        path="/dashboard/news"
        exact
        component={Dashboard}
      />
      <EditorRoute
        location={location}
        path="/dashboard/news/:page"
        exact
        component={Dashboard}
      />
      <AdminRoute
        location={location}
        path="/dashboard/phonebook"
        exact
        component={Dashboard}
      />
      <RootRoute
        location={location}
        path="/dashboard/users"
        exact
        component={Dashboard}
      />
      <Route
        location={location}
        path="/phonebook"
        exact
        component={PhoneBookPage}
      />
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
