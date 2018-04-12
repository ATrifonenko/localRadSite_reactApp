import { RECEIVED_PHONEBOOK } from "../types";
import api from "../api";

export const receivedPhonebook = phonebook => ({
  type: RECEIVED_PHONEBOOK,
  phonebook
});

export const getPhonebook = () => dispatch =>
  api.phonebook.getAll().then(res => dispatch(receivedPhonebook(res)));