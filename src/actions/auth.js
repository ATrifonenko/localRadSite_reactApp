import { USER_LOGGED_IN, USER_SIGNED_UP, USER_LOGGED_OUT } from "../types";
import api from "../api";

export const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

export const userLoggedOut = user => ({
  type: USER_LOGGED_OUT,
  user
});

export const userSignedUp = user => ({
  type: USER_SIGNED_UP,
  user
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(res => dispatch(userLoggedIn(res.user)));

export const logout = () => dispatch =>
  api.user.logout().then(res => dispatch(userLoggedOut(res.user)));

export const signup = credentials => dispatch =>
  api.user.signup(credentials).then(res => dispatch(userSignedUp(res.user)));
