import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import { connect } from "react-redux";
import { Card, Icon, List, Pagination, Grid } from "semantic-ui-react";
import "../css/newsList.css";
import moment from "moment";
import localization from "moment/locale/ru";

const NewsList = ({
  firstPage,
  otherPage,
  countNews,
  currentPage,
  getFile,
  onPageChange
}) => {
  const page = currentPage === undefined ? 1 : +currentPage;
  const news = page === 1 ? firstPage : otherPage;
  const totalPages = Math.ceil(countNews / 15);

  const files = index =>
    news[index].files.map(file => (
      <List.Item key={file.id}>
        <List.Icon name="download" verticalAlign="middle" />
        <List.Content>
          <List.Header as="a" onClick={() => getFile(file.path, file.name)}>
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
        {moment(newsItem.datetime, moment.ISO_8601)
          .locale("ru", localization)
          .format("LLL")}
        <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <Icon name="user" />
        {newsItem.author}
      </Card.Content>
    </Card>
  ));

  return (
    <div className="news-list">
      {_.isEmpty(news) ? null : item}
      {totalPages > 1 ? (
        <Grid>
          <Grid.Column textAlign="center">
            <Pagination
              activePage={page}
              boundaryRange={0}
              size="mini"
              ellipsisItem={null}
              nextItem={null}
              prevItem={null}
              firstItem={totalPages > 5 ? undefined : null}
              lastItem={totalPages > 5 ? undefined : null}
              siblingRange={2}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </Grid.Column>
        </Grid>
      ) : (
        ""
      )}
    </div>
  );
};

NewsList.propTypes = {
  firstPage: PropTypes.arrayOf(PropTypes.object).isRequired,
  otherPage: PropTypes.arrayOf(PropTypes.object).isRequired,
  getFile: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  countNews: PropTypes.number.isRequired,
  currentPage: PropTypes.string
};

NewsList.defaultProps = {
  currentPage: "1"
};

function mapStateToProps(state) {
  return {
    firstPage: state.news.firstPage,
    otherPage: state.news.otherPage,
    countNews: state.news.count
  };
}

export default connect(mapStateToProps)(NewsList);
