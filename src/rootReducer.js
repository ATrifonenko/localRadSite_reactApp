import { combineReducers } from "redux";
import user from "./reducers/user";
import sidebar from "./reducers/sidebar";

export default combineReducers({
  user,
  sidebar
});
