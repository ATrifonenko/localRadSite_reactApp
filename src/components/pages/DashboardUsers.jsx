import React from "react";
import { Table, Dropdown, Message } from "semantic-ui-react";
import api from "../../api";

class DashboardUsers extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    api.dashboard.users
      .editUsers()
      .then(res => this.setState({ users: res.users }));
  }

  onChangePrivilege = (e, { id, value }) => {
    api.dashboard.users
      .editUsers({ id, value })
      .then(res => this.setState({ users: res.users }));
  };

  render() {
    const { users } = this.state;
    const options = [
      { key: "user", text: "Пользователь", value: "user" },
      { key: "editor", text: "Редактор", value: "editor" },
      { key: "admin", text: "Админ", value: "admin" },
      { key: "root", text: "Синьор-помидор", value: "root" }
    ];
    const usersList = users.map(user => (
      <Table.Row key={user.id}>
        <Table.Cell>{user.name}</Table.Cell>
        <Table.Cell>{user.login}</Table.Cell>
        <Table.Cell width="4">
          <Dropdown
            selection
            fluid
            selectOnBlur={false}
            value={user.privilege}
            options={options}
            id={user.id}
            onChange={this.onChangePrivilege}
          />
        </Table.Cell>
      </Table.Row>
    ));
    return (
      <div className="dashboard">
        <Message info>
          <Message.Header>
            Уровни доступа пользователей (ВНИМАНИЕ: сохраняется автоматически
            при изменении):
          </Message.Header>
          <Message.List>
            <Message.Item>
              Пользователь - может только читать новости и просматривать
              справочник.
            </Message.Item>
            <Message.Item>
              Редактор - может публиковать новости на сайте.
            </Message.Item>
            <Message.Item>
              Админ - может публиковать новости и редактировать справочник.
            </Message.Item>
            <Message.Item>
              Синьор-помидор - Элита, которая может видеть это сообщение.
            </Message.Item>
          </Message.List>
        </Message>
        <Table singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Имя пользователя</Table.HeaderCell>
              <Table.HeaderCell>Логин</Table.HeaderCell>
              <Table.HeaderCell>Уровень доступа</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{usersList}</Table.Body>
        </Table>
      </div>
    );
  }
}

DashboardUsers.propTypes = {};

export default DashboardUsers;
