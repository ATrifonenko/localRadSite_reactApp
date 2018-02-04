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
      newsId: "",
      file: []
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
          text: props.news[index].text.replace(/<[^>]+>/g, ''),
          newsId: props.isEditNews
        }
      });
    } else {
      this.setState({
        data: {
          title: "",
          text: "",
          newsId: ""
        }
      });
    }
  }

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSelectFile = e => {
    const files = [];
    for (let x = 0; x < e.target.files.length; x += 1) {
      files.push(e.target.files[x]);
      console.log(files);
    }

    this.setState({
      data: { ...this.state.data, file: files }
    });
  }
  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (_.isEmpty(errors)) {
      const formData = new FormData();
      const data = this.state.data;
      for (const key in data) {
        if ({}.hasOwnProperty.call(data, key)) {
          if (key === 'file') {
            for (let x = 0; x < data[key].length; x += 1) {
              formData.append('file[]', data[key][x]);
              console.log(formData);
            }
          } else formData.append(key, data[key]);
        }
      };
      // for (const pair of formData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }

      this.setState({
        loading: true
      });
      this.props
        .submit(formData)
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
        <Form.Field>
          <input multiple type="file" onChange={this.onSelectFile} />
        </Form.Field>
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
    news: state.dashboard.news,
    isEditNews: state.dashboard.isEditNews
  };
}

AddNewsForm.propTypes = {
  submit: PropTypes.func.isRequired,
  news: PropTypes.arrayOf(PropTypes.object).isRequired,
  isEditNews: PropTypes.string.isRequired,
  editingNewsState: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { editingNewsState })(AddNewsForm);
