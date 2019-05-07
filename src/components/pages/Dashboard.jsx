import React from "react";
import { Tab } from "semantic-ui-react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import DashboardNews from "./DashboardNews";
import EditPhonebookForm from "../forms/EditPhonebookForm";
import DashboardUsers from "./DashboardUsers";

const news = {
  menuItem: "Новости",
  path: "news",
  render: () => (
    <Tab.Pane>
      <Route path="/dashboard" exact component={DashboardNews} />
      <Route path="/dashboard/news" exact component={DashboardNews} />
      <Route path="/dashboard/news/:page" exact component={DashboardNews} />
    </Tab.Pane>
  )
};
const phonebook = {
  menuItem: "Справочник",
  path: "phonebook",
  render: () => (
    <Tab.Pane>
      <Route path="/dashboard/phonebook" component={EditPhonebookForm} />
    </Tab.Pane>
  )
};
const users = {
  menuItem: "Пользователи",
  path: "users",
  render: () => (
    <Tab.Pane>
      <Route path="/dashboard/users" component={DashboardUsers} />
    </Tab.Pane>
  )
};

class Dashboard extends React.Component {
  state = {
    indexTab: 0
  };

  componentDidMount() {
    this.setIndexTab();
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location !== prevProps.location) {
      this.setIndexTab();
    }
  }

  setIndexTab = () => {
    const { match } = this.props;
    switch (match.path) {
      case "/dashboard/news" || "/dashboard/news/:page":
        this.setState({ indexTab: 0 });
        break;
      case "/dashboard/phonebook":
        this.setState({ indexTab: 1 });
        break;
      case "/dashboard/users":
        this.setState({ indexTab: 2 });
        break;
      default:
        this.setState({ indexTab: 0 });
        break;
    }
  };

  handleChange = (e, data) => {
    const { history } = this.props;
    history.push(`/dashboard/${data.panes[data.activeIndex].path}`);
  };

  render() {
    const { indexTab } = this.state;
    const { privilege } = this.props;
    let panes = [];

    switch (privilege) {
      case "root":
        panes = [news, phonebook, users];
        break;
      case "admin":
        panes = [news, phonebook];
        break;
      case "editor":
        panes = [news];
        break;
      default:
        break;
    }

    return (
      <div className="dashboard">
        <h2>Панель управления</h2>
        <Tab
          activeIndex={indexTab}
          panes={panes}
          onTabChange={this.handleChange}
        />
      </div>
    );
  }
}

function mapStateToPrors(state) {
  return {
    privilege: state.user.privilege
  };
}

Dashboard.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
  match: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired,
  privilege: PropTypes.string.isRequired
};

export default connect(mapStateToPrors)(Dashboard);
