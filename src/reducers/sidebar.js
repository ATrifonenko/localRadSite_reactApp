import { CHANGE_FORM } from "../types";

export default function sidebar(state = { isLoginForm: true }, action = {}) {
  switch (action.type) {
    case CHANGE_FORM:
      return { ...state, isLoginForm: !state.isLoginForm };
    default:
      return state;
  }
}
