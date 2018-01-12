import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import "semantic-ui-css/semantic.min.css";
import "./index.css";
import App from "./app";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./rootReducer";
import api from "./api";
import { userLoggedIn } from "./actions/auth";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

api.user.checkAuth().then(res => store.dispatch(userLoggedIn(res.user)));

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
