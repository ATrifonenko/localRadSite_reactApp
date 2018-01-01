import React, { Component } from 'react';
import './app.css';

import Header from './components/header';
import Footer from './components/footer';
import NewsList from './components/newsList';
import AddNewsForm from './components/addNewsForm';
import LoginForm from './components/loginForm';

class App extends Component {
	state= {
        news: [],
	  	logged: false
    }	

    componentDidMount() {
        this.getMain()
    }

	getMain = () => {
	  fetch('//radmvd.local/api/getMain.php')
	      .then(response => response.json())
	      .then(data => {
	          this.setState({
	              news: data.news,
	              logged: data.logged
	          })
	      })
	      .catch(error => console.log(error));
    }	
    
    changeForm = (logged) => {
        this.setState({
            logged
        })
    }

	render() {
	  	return (
	    	<div className="app">
	      		<Header/>
                { (this.state.logged) ? <AddNewsForm/> : <LoginForm logged = {this.state.logged} onChangeForm={this.changeForm}/> }
	      		<NewsList news={this.state.news} />
	      		<Footer/>
	    	</div>
	  	);
	}
}

export default App;
