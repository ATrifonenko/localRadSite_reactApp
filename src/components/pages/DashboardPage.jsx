import React from "react";
import PropTypes from "prop-types";
import { Button, List, Popup } from "semantic-ui-react";
import { connect } from "react-redux";
import api from "../../api";
import "../../css/dashboard.css";
import AddNewsForm from "../forms/AddNewsForm";
import { newsTitle, editingNewsState } from "../../actions/dashboard";

class DashboardPage extends React.Component {
  state = {
    newsId: ""
  };

  componentDidMount() {
    api.dashboard.news.getTitle().then(res => this.props.newsTitle(res));
  }

  onSubmit = async data => {
    if (this.props.isEditNews) {
      await api.dashboard.news
        .editNews(data)
        .then(res => this.props.newsTitle(res));
    } else {
      await api.dashboard.news
        .addNews(data)
        .then(res => this.props.newsTitle(res));
    }
  };

  onEditNewsStart = e => {
    const newsId = e.target.closest("div[news_id]").getAttribute("news_id");
    this.props.editingNewsState(newsId);
  };

  onDeleteNews = () => {
    const data = {
      delete: true,
      newsId: this.state.newsId
    };
    api.dashboard.news.deleteNews(data).then(res => this.props.newsTitle(res));
  };

  getNewsId = e => {
    this.setState({
      newsId: e.target.closest("div[news_id]").getAttribute("news_id")
    });
  };

  render() {
    const listTitle = this.props.news.map(news => (
      <List.Item key={news.id} news_id={news.id}>
        <List.Content floated="right" verticalAlign="middle">
          <Button
            disabled={!!this.props.isEditNews}
            compact
            circular
            icon="edit"
            color="blue"
            title="Редактировать"
            onClick={this.onEditNewsStart}
          />
          <Popup
            trigger={
              <Button
                disabled={!!this.props.isEditNews}
                compact
                negative
                circular
                icon="delete"
                title="Удалить"
                onClick={this.getNewsId}
              />
            }
            content={
              <Button
                color="red"
                content="Подтвердить удаление!"
                title="Уверены?"
                onClick={this.onDeleteNews}
              />
            }
            on="click"
            position="top center"
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
            <AddNewsForm submit={this.onSubmit} />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    news: state.dashboard.news,
    isEditNews: state.dashboard.isEditNews
  };
}

DashboardPage.propTypes = {
  newsTitle: PropTypes.func.isRequired,
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEditNews: PropTypes.string.isRequired,
  editingNewsState: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { newsTitle, editingNewsState }
)(DashboardPage);
