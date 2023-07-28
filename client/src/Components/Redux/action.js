import * as types from "./actionType";

const getAllUserRequest = () => {
  return { type: types.GET_ALL_USER_REQUEST };
};

const getAllUserSuccess = (payload) => {
  return { type: types.GET_ALL_USER_SUCCESS, payload };
};

const getAllUserError = () => {
  return { type: types.GET_ALL_USER_ERROR };
};

const getSearchUserRequest = () => {
  return { type: types.GET_SEARCH_USER_REQUEST };
};

const getSearchUserSuccess = (payload) => {
  return { type: types.GET_SEARCH_USER_SUCCESS, payload };
};

const getSearchUserError = () => {
  return { type: types.GET_SEARCH_USER_ERROR };
};

export {
  getAllUserRequest,
  getAllUserSuccess,
  getAllUserError,
  getSearchUserRequest,
  getSearchUserSuccess,
  getSearchUserError,
};
