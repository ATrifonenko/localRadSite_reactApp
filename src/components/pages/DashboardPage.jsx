import React from "react";
import PropTypes from "prop-types";
import { Button, List } from "semantic-ui-react";
import { connect } from "react-redux";
import api from "../../api";
import "../../css/dashboard.css";
import AddNewsForm from "../forms/AddNewsForm";
import { newsTitle } from "../../actions/dashboard";

class DashboardPage extends React.Component {
  state = {
    editNews: ""
  };

  componentDidMount() {
    api.dashboard.news.getTitle().then(res => this.props.newsTitle(res));
  }

  onSubmit = data =>
    api.dashboard.news.addNews(data).then(res => this.props.newsTitle(res));

  onEditNews = e => {
    this.setState({
      editNews: e.target.closest("div[news_id]").getAttribute("news_id")
    });
  };

  render() {
    const listTitle = this.props.news.map(news => (
      <List.Item key={news.news_id} news_id={news.news_id}>
        <List.Content floated="right" verticalAlign="middle">
          <Button
            compact
            circular
            icon="edit"
            color="blue"
            onClick={this.onEditNews}
          />
          <Button
            compact
            negative
            circular
            icon="delete"
            onClick={this.onDeleteNews}
          />
        </List.Content>
        <List.Content>{news.title}</List.Content>
      </List.Item>
    ));
    return (
      <div className="dashboard">
        <h2>Панель управления</h2>
        <h3>Новости</h3>
        <div className="dashboard-news">
          <div className="list-news">
            <p>Мои новости:</p>
            <List divided>{listTitle}</List>
          </div>
          <div className="add-news">
            <p>Добавить новость</p>
            <AddNewsForm
              editNews={this.state.editNews}
              submit={this.onSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    news: state.dashboard.news
  };
}

DashboardPage.propTypes = {
  newsTitle: PropTypes.func.isRequired,
  news: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps, { newsTitle })(DashboardPage);
