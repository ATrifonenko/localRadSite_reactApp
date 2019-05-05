import React from "react";
import { Tab } from "semantic-ui-react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import DashboardPage from "./DashboardPage";
import EditPhonebookForm from "../forms/EditPhonebookForm";

const panes = [
  {
    menuItem: "Новости",
    path: "news",
    render: () => (
      <Tab.Pane>
        <Route path="/dashboard" exact component={DashboardPage} />
        <Route path="/dashboard/news" exact component={DashboardPage} />
        <Route path="/dashboard/news/:page" exact component={DashboardPage} />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Справочник",
    path: "phonebook",
    render: () => (
      <Tab.Pane>
        <Route path="/dashboard/phonebook" component={EditPhonebookForm} />
      </Tab.Pane>
    )
  }
];

class TestingPage extends React.Component {
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

TestingPage.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired })
    .isRequired,
  match: PropTypes.shape({ path: PropTypes.string.isRequired }).isRequired
};

export default TestingPage;
