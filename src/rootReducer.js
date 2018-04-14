import { combineReducers } from "redux";
import user from "./reducers/user";
import sidebar from "./reducers/sidebar";
import dashboard from "./reducers/dashboard";
import phonebook from "./reducers/phonebook";
import news from './reducers/news';

const appReducer = combineReducers({
  user,
  sidebar,
  dashboard,
  phonebook,
  news
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGGED_OUT') {
    state.user = undefined
  }

  return appReducer(state, action)
}

export default rootReducer;