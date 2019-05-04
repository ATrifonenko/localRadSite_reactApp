import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button, List } from "semantic-ui-react";
import InlineError from "../messages/InlineError";
import "../../css/addNewsForm.css";
import { editingNewsState } from "../../actions/dashboard";

class AddNewsForm extends React.Component {
  state = {
    data: {
      title: "",
      text: "",
      newsId: "",
      files: [],
      delFiles: []
    },
    loading: false,
    errors: {}
  };

  componentWillReceiveProps(props) {
    if (props.isEditNews) {
      const index = props.news.findIndex(
        // eslint-disable-next-line eqeqeq
        element => element.id == props.isEditNews
      );
      this.setState(prevState => ({
        data: {
          ...prevState.data,
          title: props.news[index].title,
          text: props.news[index].text.replace(/<[^>]+>/g, ""),
          newsId: props.isEditNews,
          files: props.news[index].files
        }
      }));
    } else {
      this.setState({
        data: {
          title: "",
          text: "",
          newsId: "",
          files: [],
          delFiles: []
        }
      });
    }
  }

  onChange = e => {
    e.persist();
    this.setState(prevState => ({
      data: { ...prevState.data, [e.target.name]: e.target.value }
    }));
  };

  onSelectFile = e => {
    const { data } = this.state;
    const files = data.files.slice();
    files.push(e.target.files[0]);
    this.setState(prevState => ({
      data: { ...prevState.data, files }
    }));
    e.target.value = "";
  };

  onDeleteFile = e => {
    const { data } = this.state;
    const index = e.target.closest("div[index]").getAttribute("index");
    const delFiles = data.delFiles.slice();
    const files = data.files.slice();
    delFiles.push(files[index].id);
    files.splice(index, 1);
    this.setState(prevState => ({
      data: { ...prevState.data, files, delFiles }
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    const { submit, editingNewsStateConnect } = this.props;
    const errors = this.validate(data);
    this.setState({ errors });
    if (_.isEmpty(errors)) {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if ({}.hasOwnProperty.call(data, key)) {
          if (key === "files") {
            for (let x = 0; x < data[key].length; x += 1) {
              formData.append("file[]", data[key][x]);
            }
          } else if (key === "delFiles") {
            for (let x = 0; x < data[key].length; x += 1) {
              formData.append("delFile[]", data[key][x]);
            }
          } else formData.append(key, data[key]);
        }
      });

      this.setState({
        loading: true
      });
      submit(formData)
        .then(() => {
          this.setState(prevState => ({
            data: {
              ...prevState.data,
              title: "",
              text: "",
              newsId: "",
              files: [],
              delFile: []
            },
            loading: false
          }));
          editingNewsStateConnect("");
        })
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  onCancelEdit = () => {
    const { editingNewsStateConnect } = this.props;
    editingNewsStateConnect("");
  };

  validate = data => {
    const errors = {};
    if (!data.title) errors.title = "Нет заголовка";
    return errors;
  };

  render() {
    const { data, errors, loading } = this.state;
    const { isEditNews } = this.props;

    const fileList = data.files.map((file, index) => (
      <List.Item key={file.id || index} index={index}>
        <List.Content floated="right" verticalAlign="middle">
          <Button
            compact
            basic
            circular
            color="red"
            icon="delete"
            title="Удалить"
            onClick={this.onDeleteFile}
          />
        </List.Content>
        <List.Content className="list-content">{file.name}</List.Content>
      </List.Item>
    ));

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
          placeholder="Текст"
          name="text"
          value={data.text}
          onChange={this.onChange}
        />
        <p>Файлы:</p>
        <List divided>{fileList}</List>
        <Button as="div" className="addFile">
          Прикрепить файл
          <input type="file" onChange={this.onSelectFile} />
        </Button>
        <Button primary>{isEditNews ? "Редактировать" : "Опубликовать"}</Button>
        {isEditNews ? (
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
  editingNewsStateConnect: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  { editingNewsStateConnect: editingNewsState }
)(AddNewsForm);
