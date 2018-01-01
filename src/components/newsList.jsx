import React from 'react';
import '../css/newsList.css';

const NewsList = props => {

    const item = props.news.map(newsItem =>
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

export default NewsList;