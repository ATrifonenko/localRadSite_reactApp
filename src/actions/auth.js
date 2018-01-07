import { USER_LOGGED_IN, USER_SIGNED_UP } from "../types";
import api from "../api";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userSignedUp = user => ({
  type: USER_SIGNED_UP,
  user
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => dispatch(userLoggedIn(user)));

export const signup = credentials => dispatch =>
  api.user.signup(credentials).then(user => dispatch(userSignedUp(user)));
