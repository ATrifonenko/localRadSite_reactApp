import { USER_LOGGED_IN, USER_SIGNED_UP } from "../types";

export default function user(state = {}, action = {}) {
  switch (action.type) {
    case USER_LOGGED_IN:
      return action.user;
    case USER_SIGNED_UP:
      return action.user;
    default:
      return state;
  }
}
