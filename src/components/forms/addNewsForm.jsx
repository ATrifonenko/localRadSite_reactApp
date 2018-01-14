import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import "../../css/addNewsForm.css";
import { editingNewsState } from "../../actions/dashboard";

class AddNewsForm extends React.Component {
  state = {
    data: {
      title: "",
      text: "",
      author: this.props.author,
      newsId: ""
    },
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(props) {
    if (props.isEditNews) {
      const index = props.news.findIndex(
        element => element.id === props.isEditNews
      );
      this.setState({
        data: {
          ...this.state.data,
          title: props.news[index].title,
          text: props.news[index].text,
          newsId: props.isEditNews
        }
      });
    } else {
      this.setState({
        data: {
          title: "",
          text: "",
          author: props.author,
          newsId: ""
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
        .then(() => {
          this.setState({
            data: { ...this.state.data, title: "", text: "", newsId: "" },
            loading: false
          });
          this.props.editingNewsState("");
        })
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  onCancelEdit = () => {
    this.props.editingNewsState("");
  };

  validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Нет заголовка";
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
        <Form.TextArea
          autoHeight
          placeholder="Текст"
          name="text"
          value={data.text}
          onChange={this.onChange}
        />
        <Button primary>
          {this.props.isEditNews ? "Редактировать" : "Добавить"}
        </Button>
        {this.props.isEditNews ? (
          <Button content="Отмена" onClick={this.onCancelEdit} />
        ) : (
          ""
        )}
      </Form>
    );
  }
}

function mapStateToProps(state) {
  return {
    author: state.user.name || "",
    news: state.dashboard.news,
    isEditNews: state.dashboard.isEditNews
  };
}

AddNewsForm.propTypes = {
  submit: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEditNews: PropTypes.string.isRequired,
  editingNewsState: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { editingNewsState })(AddNewsForm);
