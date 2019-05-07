import React from "react";
import PropTypes from "prop-types";
import { Button, List, Popup, Pagination, Grid } from "semantic-ui-react";
import { connect } from "react-redux";
import api from "../../api";
import "../../css/dashboard.css";
import AddNewsForm from "../forms/AddNewsForm";
import {
  newsTitle,
  getNewsTitle,
  editingNewsState
} from "../../actions/dashboard";

class DashboardNews extends React.Component {
  state = {
    newsId: ""
  };

  componentDidMount() {
    const { match } = this.props;
    this.getNewsPage(match.params.page || "1");
  }

  componentDidUpdate(prevProps) {
    const {
      location: { pathname }
    } = this.props;

    if (pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  onPageChange = (e, { activePage }) => {
    const { history } = this.props;
    history.push(`/dashboard/news/${activePage}`);
    this.getNewsPage(activePage);
  };

  getNewsPage = page => {
    const { getNewsTitleConnect } = this.props;
    getNewsTitleConnect(page);
  };

  onSubmit = async data => {
    const { isEditNews, newsTitleConnect, history } = this.props;
    if (isEditNews) {
      await api.dashboard.news
        .editNews(data)
        .then(res => newsTitleConnect(res))
        .then(() => history.replace("/dashboard/news/1"));
    } else {
      await api.dashboard.news
        .addNews(data)
        .then(res => newsTitleConnect(res))
        .then(() => history.replace("/dashboard/news/1"));
    }
  };

  onEditNewsStart = e => {
    const newsId = e.target.closest("div[news_id]").getAttribute("news_id");
    const { editingNewsStateConnect } = this.props;
    editingNewsStateConnect(newsId);
  };

  onDeleteNews = () => {
    const { newsId } = this.state;
    const { history } = this.props;
    const data = {
      delete: true,
      newsId
    };
    api.dashboard.news
      .deleteNews(data)
      .then(res => {
        const { newsTitleConnect } = this.props;
        newsTitleConnect(res);
      })
      .then(() => history.replace("/dashboard/news/1"));
  };

  getNewsId = e => {
    this.setState({
      newsId: e.target.closest("div[news_id]").getAttribute("news_id")
    });
  };

  render() {
    const { news: newsProps, isEditNews, countNews, match } = this.props;
    const totalPages = Math.ceil(countNews / 15);

    const listTitle = newsProps.map(news => (
      <List.Item key={news.id} news_id={news.id}>
        <List.Content floated="right" verticalAlign="middle">
          <Button
            disabled={!!isEditNews}
            compact
            basic
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
                basic
                circular
                color="red"
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
        <List.Content className="list-content">{news.title}</List.Content>
      </List.Item>
    ));

    return (
      <div className="dashboard">
        <div className="dashboard-news">
          <div className="list-news">
            <p>Мои новости:</p>
            <List divided className="title-list">
              {listTitle}
            </List>
            {totalPages > 1 ? (
              <Grid>
                <Grid.Column textAlign="center">
                  <Pagination
                    activePage={match.params.page || 1}
                    boundaryRange={0}
                    size="mini"
                    ellipsisItem={null}
                    nextItem={null}
                    prevItem={null}
                    firstItem={totalPages > 5 ? undefined : null}
                    lastItem={totalPages > 5 ? undefined : null}
                    siblingRange={2}
                    totalPages={totalPages}
                    onPageChange={this.onPageChange}
                  />
                </Grid.Column>
              </Grid>
            ) : (
              ""
            )}
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
    isEditNews: state.dashboard.isEditNews,
    countNews: state.dashboard.count
  };
}

DashboardNews.propTypes = {
  newsTitleConnect: PropTypes.func.isRequired,
  getNewsTitleConnect: PropTypes.func.isRequired,
  countNews: PropTypes.number.isRequired,
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEditNews: PropTypes.string.isRequired,
  editingNewsStateConnect: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      page: PropTypes.node
    }).isRequired
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired
};

export default connect(
  mapStateToProps,
  {
    newsTitleConnect: newsTitle,
    getNewsTitleConnect: getNewsTitle,
    editingNewsStateConnect: editingNewsState
  }
)(DashboardNews);
