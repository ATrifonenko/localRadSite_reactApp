import React from "react";
import { Route } from "react-router-dom";
import "./app.css";

import Header from "./components/header";
import Footer from "./components/footer";
import HomePage from "./components/pages/HomePage";
import TestingPage from "./components/pages/TestingPage";
import PhoneBookPage from "./components/pages/PhoneBookPage";

const App = () => (
  <div className="app">
    <Header />
    <Route path="/" exact component={HomePage} />
    <Route path="/testing" exact component={TestingPage} />
    <Route path="/phonebook" exact component={PhoneBookPage} />
    <Footer />
  </div>
);

export default App;
