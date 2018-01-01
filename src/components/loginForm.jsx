import React from 'react';
import '../css/addNewsForm.css';

class LoginForm extends React.Component {
    state = {
        login: '',
        password: '',
        password2: '',
        loginForm: true
    }

    handleChange = event => {
        const name = event.target.name;

        this.setState({
            [name]: event.target.value    
        })
    }

    handleChangeForm = event => {
        event.preventDefault();
        this.setState({
            loginForm: !this.state.loginForm 
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        
        let data = new FormData();
        const state_data = (this.state.loginForm) 
            ? {login: this.state.login, password: this.state.password} 
            : {login: this.state.login, password: this.state.password, password2: this.state.password2};
        data.append( "json", JSON.stringify( state_data ));
        const query = {
            method: 'POST',
            body: data
        }
        const path = (this.state.loginForm) ? 'login.php' : 'signup.php';
        fetch('//radmvd.local/api/' + path, query)
            .then(response => response.json())
            .then(data => {
                this.props.onChangeForm( data.logged );
            })
            .catch(error => console.log(error));
    }

    render() {
        
        let pass_check = null;
        if (!this.state.loginForm) {
            pass_check = <input className="enjoy-input" type="password" name="password2" placeholder="Пароль еще раз" value={this.state.password2} onChange={this.handleChange}/>
        } 

        return (
            <form onSubmit={this.handleSubmit}>
                <input className="enjoy-input" type="text" name="login" placeholder="Логин" value={this.state.login} onChange={this.handleChange}/>
                <input className="enjoy-input" type="password" name="password" placeholder="Пароль" value={this.state.password} onChange={this.handleChange}/>
                {pass_check}
                <button className="button">{(this.state.loginForm) ? 'Войти' : 'Зарегистрироваться'}</button>
                <span className="change-form">или <a href='' onClick={this.handleChangeForm}>{(this.state.loginForm) ? 'Зарегистрироваться' : 'Войти'}</a></span>
            </form>
        )
    }
}

export default LoginForm;