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
    api.dashboard.news.getTitle().then(res => {
      const { newsTitleConnect } = this.props;
      newsTitleConnect(res);
    });
  }

  onSubmit = async data => {
    const { isEditNews, newsTitleConnect } = this.props;
    if (isEditNews) {
      await api.dashboard.news
        .editNews(data)
        .then(res => newsTitleConnect(res));
    } else {
      await api.dashboard.news.addNews(data).then(res => newsTitleConnect(res));
    }
  };

  onEditNewsStart = e => {
    const newsId = e.target.closest("div[news_id]").getAttribute("news_id");
    const { editingNewsStateConnect } = this.props;
    editingNewsStateConnect(newsId);
  };

  onDeleteNews = () => {
    const { newsId } = this.state;
    const data = {
      delete: true,
      newsId
    };
    api.dashboard.news.deleteNews(data).then(res => {
      const { newsTitleConnect } = this.props;
      newsTitleConnect(res);
    });
  };

  getNewsId = e => {
    this.setState({
      newsId: e.target.closest("div[news_id]").getAttribute("news_id")
    });
  };

  render() {
    const { news: newsProps, isEditNews } = this.props;
    const listTitle = newsProps.map(news => (
      <List.Item key={news.id} news_id={news.id}>
        <List.Content floated="right" verticalAlign="middle">
          <Button
            disabled={!!isEditNews}
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
                disabled={!!isEditNews}
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
  newsTitleConnect: PropTypes.func.isRequired,
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEditNews: PropTypes.string.isRequired,
  editingNewsStateConnect: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { newsTitleConnect: newsTitle, editingNewsStateConnect: editingNewsState }
)(DashboardPage);
