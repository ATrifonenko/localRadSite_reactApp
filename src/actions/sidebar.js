import { CHANGE_FORM } from "../types";

export const changedForm = () => ({
  type: CHANGE_FORM
});

export const changeForm = e => dispatch => {
  e.preventDefault();
  dispatch(changedForm());
};
