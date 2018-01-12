import { combineReducers } from "redux";
import user from "./reducers/user";
import sidebar from "./reducers/sidebar";
import dashboard from "./reducers/dashboard";

export default combineReducers({
  user,
  sidebar,
  dashboard
});
