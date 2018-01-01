import React from "react";
import { Route } from "react-router-dom";
import "./app.css";

import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./components/pages/HomePage";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Route path="/" exect component={HomePage} />
        <Footer />
      </div>
    );
  }
}

export default App;
