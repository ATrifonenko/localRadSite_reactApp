import React from 'react';
import '../css/addNewsForm.css';

class LoginForm extends React.Component {
    state = {
        username: '',
        password: ''
    }

    handleChange = event => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value    
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state);

        let data = new FormData();
        data.append( "json", JSON.stringify( this.state ));
        console.log(data);
        const query = {
            method: 'POST',
            body: data,
            mode: 'no-cors'
        }

        fetch('//radmvd/backend/login.php', query)
            .catch(error => console.log(error));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input className="enjoy-input" type="text" name="username" placeholder="Логин" value={this.state.title} onChange={this.handleChange}/>
                <input className="enjoy-input" type="password" name="password" placeholder="Пароль" value={this.state.text} onChange={this.handleChange}/>
                <button className="button">Войти</button>
            </form>
        )
    }
}

export default LoginForm;