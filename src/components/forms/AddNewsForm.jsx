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
        element => element.id == props.isEditNews
      );
      this.setState({
        data: {
          ...this.state.data,
          title: props.news[index].title,
          text: props.news[index].text.replace(/<[^>]+>/g, ""),
          newsId: props.isEditNews,
          files: props.news[index].files
        }
      });
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

  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSelectFile = e => {
    const files = this.state.data.files.slice();
    files.push(e.target.files[0]);
    this.setState({
      data: { ...this.state.data, files }
    });
    e.target.value = "";
  };

  onDeleteFile = e => {
    const index = e.target.closest("div[index]").getAttribute("index");
    const delFiles = this.state.data.delFiles.slice();
    const files = this.state.data.files.slice();
    delFiles.push(files[index].id);
    files.splice(index, 1);
    this.setState({
      data: { ...this.state.data, files, delFiles }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (_.isEmpty(errors)) {
      const formData = new FormData();
      const { data } = this.state;
      for (const key in data) {
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
      }

      this.setState({
        loading: true
      });
      this.props
        .submit(formData)
        .then(() => {
          this.setState({
            data: {
              ...this.state.data,
              title: "",
              text: "",
              newsId: "",
              files: [],
              delFile: []
            },
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

    const fileList = this.state.data.files.map((file, index) => (
      <List.Item key={file.id || index} index={index}>
        <List.Content floated="right" verticalAlign="middle">
          <Button
            compact
            negative
            circular
            icon="delete"
            title="Удалить"
            onClick={this.onDeleteFile}
          />
        </List.Content>
        <List.Content>{file.name}</List.Content>
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
          autoHeight
          placeholder="Текст"
          name="text"
          value={data.text}
          onChange={this.onChange}
        />
        <label>Файлы:</label>
        <List divided>{fileList}</List>
        <Form.Button className="addFile">
          Прикрепить файл
          <input type="file" onChange={this.onSelectFile} />
        </Form.Button>
        <Button primary>
          {this.props.isEditNews ? "Редактировать" : "Опубликовать"}
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

export default connect(
  mapStateToProps,
  { editingNewsState }
)(AddNewsForm);
