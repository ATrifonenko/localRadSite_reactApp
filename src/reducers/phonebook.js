import { RECEIVED_PHONEBOOK } from "../types";

export default function phonebook(
  state = { phonebook: [], subdivision: [] },
  action = {}
) {
  switch (action.type) {
    case RECEIVED_PHONEBOOK:
      return action.phonebook;
    default:
      return state;
  }
}
