import { RECEIVED_PHONEBOOK } from "../types";

export default function phonebook(state = {phonebook:[]}, action = {}) {
  switch (action.type) {
    case RECEIVED_PHONEBOOK:
      return action.phonebook;
    default:
      return state;
  }
}