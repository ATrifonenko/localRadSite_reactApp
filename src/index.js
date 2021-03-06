import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import "semantic-ui-offline/semantic.min.css";
import "./index.css";
import App from "./app";
import rootReducer from "./rootReducer";
import api from "./api";
import { userLoggedIn } from "./actions/auth";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

api.user
  .checkAuth()
  .then(res => store.dispatch(userLoggedIn(res.user)))
  .then(() => {
    ReactDOM.render(
      <BrowserRouter>
        <Provider store={store}>
          <Route component={App} />
        </Provider>
      </BrowserRouter>,
      document.getElementById("root")
    );
  });
