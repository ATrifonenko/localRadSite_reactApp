import React from 'react';
import '../css/newsList.css';

class NewsList extends React.Component {
    
    state = {
        news: []
    }

    componentDidMount() {
        this.getNews()
    }

    getNews = () => {

        fetch('//radmvd/backend/getNews.php')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    news: data.news
                })
            })
            .catch(error => console.log(error));
    }

    render() {
        const item = this.state.news.map(newsItem => 
            <div className="news-item" key={newsItem.id}>
                <h1 className="title-news">{newsItem.title}</h1>            
                <p className="text-news">{newsItem.text}</p>
                <div className="info-news">
                    <p className="date-news">{newsItem.datetime}</p>
                    <p className="autor-news">{newsItem.author}</p>  
                </div>  
            </div>
        );
            
        return (
            <div className="news-list">
                {item}
            </div>
        );
    }
}   

export default NewsList;