import React from 'react';
import '../css/newsList.css';

function NewsList() {
    return (
        <div className="news-list">
            <div className="news-item">
                <h1 className="title-news">Заголовок новости</h1>            
                <p className="text-news">Съешь еще этих мягких французских булочек.</p>
                <div className="info-news">
                    <p className="date-news">03 августа 2017г.</p>
                    <p className="autor-news">Админ</p>  
                </div>  
            </div>
            <div className="news-item">
                <h1 className="title-news">Заголовок новости 2</h1>            
                <p className="text-news">Съешь еще этих мягких французских булочек.</p>
                <div className="info-news">
                    <p className="date-news">03 августа 2017г.</p>
                    <p className="autor-news">Админ</p>  
                </div>  
            </div>
        </div>
    );
}

export default NewsList;