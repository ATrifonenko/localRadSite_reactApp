import React from "react";
import { Tab } from 'semantic-ui-react';
import DashboardPage from './DashboardPage';
import EditPhonebookForm from '../forms/EditPhonebookForm';

const panes = [
  { menuItem: 'Новости', render: () => <Tab.Pane><DashboardPage /></Tab.Pane> },
  { menuItem: 'Справочник', render: () => <Tab.Pane><EditPhonebookForm /></Tab.Pane> }
]

const TestingPage = () => (
  <div className="dashboard">
    <h2>Панель управления</h2>
    <Tab panes={panes} />
  </div>
)

export default TestingPage;
