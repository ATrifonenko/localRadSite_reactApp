import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import { Card, Icon, List } from "semantic-ui-react";
import "../css/newsList.css";

const NewsList = ({ news }) => {
  const files = index =>
    news[index].files.map(file => (
      <List.Item key={file.id}>
        <List.Icon name="download" verticalAlign="middle" />
        <List.Content>
          <List.Header as="a" href={file.path} download>
            {file.name}
          </List.Header>
        </List.Content>
      </List.Item>
    ));

  const item = news.map((newsItem, index) => (
    <Card fluid className="custom-card" key={newsItem.id}>
      <Card.Content>
        <Card.Header className="">{newsItem.title}</Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Description>
          <p dangerouslySetInnerHTML={{ __html: newsItem.text }} />
        </Card.Description>
      </Card.Content>
      <Card.Content className={newsItem.files.length > 0 ? "" : "hidden"}>
        <List>{files(index)}</List>
      </Card.Content>
      <Card.Content extra>
        <Icon name="clock" />
        {newsItem.datetime}
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <Icon name="user" />
        {newsItem.author}
      </Card.Content>
    </Card>
  ));

  return <div className="news-list">{_.isEmpty(news) ? null : item}</div>;
};

NewsList.propTypes = {
  news: PropTypes.arrayOf(PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    news: state.news.news
  };
}

export default connect(mapStateToProps)(NewsList);
