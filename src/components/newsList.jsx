import React from "react";
import PropTypes from 'prop-types';
import "../css/newsList.css";

const NewsList = props => {
  const item = props.news.map(newsItem => (
    <div className="news-item" key={newsItem.id}>
      <h1 className="title-news">{newsItem.title}</h1>
      <p className="text-news" dangerouslySetInnerHTML={{ __html: newsItem.text }} />
      <div className="info-news">
        <p className="date-news">{newsItem.datetime}</p>
        <p className="autor-news">{newsItem.author}</p>
      </div>
    </div>
  ));

  return <div className="news-list">{item}</div>;
};

NewsList.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default NewsList;
