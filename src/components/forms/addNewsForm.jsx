import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, TextArea, Button } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import "../../css/addNewsForm.css";

class AddNewsForm extends React.Component {
  state = {
    editNews: "",
    data: {
      title: "",
      text: "",
      author: this.props.author
    },
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(props) {
    if (this.state.editNews !== props.editNews) {
      const index = props.news.findIndex(
        element => element.news_id === props.editNews
      );
      this.setState({
        data: {
          ...this.state.data,
          title: props.news[index].title,
          text: props.news[index].text
        },
        editNews: props.editNews
      });
    } else {
      this.setState({
        data: {
          ...this.state.data,
          author: props.author
        }
      });
    }
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (_.isEmpty(errors)) {
      this.setState({
        loading: true
      });
      this.props
        .submit(this.state.data)
        .then(
          this.setState({
            data: { ...this.state.data, title: "", text: "" },
            loading: false
          })
        )
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Нет заголовка";
    if (!data.text) errors.text = "Нет текста";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;

    return (
      <Form onSubmit={this.onSubmit} loading={loading}>
        <Form.Field error={!!errors.title}>
          <input
            placeholder="Заголовок"
            name="title"
            value={data.title}
            onChange={this.onChange}
          />
          {errors.title && <InlineError text={errors.title} />}
        </Form.Field>
        <TextArea
          autoHeight
          placeholder="Текст"
          name="text"
          value={data.text}
          onChange={this.onChange}
        />
        <Button primary>Добавить</Button>
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    author: state.user.name || "",
    news: state.dashboard.news
  };
}

AddNewsForm.propTypes = {
  submit: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  editNews: PropTypes.string.isRequired,
  news: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default connect(mapStateToProps)(AddNewsForm);
