import React, { Component } from 'react';
import './app.css';

import Header from './components/header';
import Footer from './components/footer';
import NewsList from './components/newsList';
import AddNewsForm from './components/addNewsForm';
import LoginForm from './components/loginForm';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header/>
        <AddNewsForm/>
        <LoginForm/>
        <NewsList/>
        <Footer/>
      </div>
    );
  }
}

export default App;
