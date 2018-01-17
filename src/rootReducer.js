import { combineReducers } from "redux";
import user from "./reducers/user";
import sidebar from "./reducers/sidebar";
import dashboard from "./reducers/dashboard";

const appReducer = combineReducers({
  user,
  sidebar,
  dashboard
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGGED_OUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;