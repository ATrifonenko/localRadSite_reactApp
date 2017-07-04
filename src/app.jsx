import React, { Component } from 'react';
import './app.css';

import Header from './components/header';
import Footer from './components/footer';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <Footer/>
      </div>
    );
  }
}

export default App;
