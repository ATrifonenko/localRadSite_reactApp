import React, { Component } from 'react';
import '../css/addNewsForm.css';

class AddNewsForm extends Component {
    state = {
        title: '',
        text: '',
        author: ''
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

        fetch('//radmvd/backend/addNews.php', query)
            .then(response => response.json())
            //.then(({ city }) => this.fetchWeatherData(city))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input className="enjoy-input" type="text" name="title" placeholder="Заголовок" value={this.state.title} onChange={this.handleChange}/>
                <textarea className="enjoy-input" cols="40" rows="20" name="text" placeholder="Текст" value={this.state.text} onChange={this.handleChange}/>
                <input className="enjoy-input" type="text" name="author" placeholder="Имя пользователя" value={this.state.author} onChange={this.handleChange}/>
                <button className="button">Добавить</button>
            </form>
        )
    }
}

export default AddNewsForm;