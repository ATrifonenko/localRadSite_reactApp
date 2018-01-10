import React from "react";
import PropTypes from "prop-types";
import { Form, Button, TextArea, List } from "semantic-ui-react";
import { connect } from "react-redux";
import api from "../../api";
import "../../css/dashboard.css";

class DashboardPage extends React.Component {
  state = {
    data: {
      title: "",
      text: "",
      author: this.props.author
    },
    news: [
      {
        title: "A Complete Guide to Flexbox"
      },
      {
        title:
          "15 часов и две тысячи рублей: как сделать картину из GTA 5 в реальной жизни 15 часов и две тысячи рублей: как сделать картину из GTA 5 в реальной жизни"
      },
      {
        title: "Заголовок 1"
      },
      {
        title: "Заголовок 1"
      },
      {
        title: "Заголовок 1"
      }
    ]
  };
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = () => api.moderate.publish(this.state.data).then();

  render() {
    const listItem = this.state.news.map(newsItem => (
      <List.Item>
        <List.Content floated="right" verticalAlign="middle">
          <Button compact circular icon="edit" color="blue" />
          <Button compact negative circular icon="delete" />
        </List.Content>
        <List.Content>{newsItem.title}</List.Content>
      </List.Item>
    ));
    return (
      <div className="dashboard">
        <h2>Панель управления</h2>
        <h3>Новости</h3>
        <div className="dashboard-news">
          <div className="list-news">
            <p>Мои новости:</p>
            <List divided>{listItem}</List>
          </div>
          <div className="add-news">
            <p>Добавить новость</p>
            <Form>
              <Form.Field>
                <input
                  placeholder="Заголовок"
                  name="title"
                  onChange={this.onChange}
                />
              </Form.Field>
              <TextArea
                autoHeight
                placeholder="Текст"
                name="text"
                onChange={this.onChange}
              />
              <Button primary onClick={this.onSubmit}>
                Добавить
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    author: state.user.name
  };
}

DashboardPage.propTypes = {
  author: PropTypes.string.isRequired
};
export default connect(mapStateToProps)(DashboardPage);
