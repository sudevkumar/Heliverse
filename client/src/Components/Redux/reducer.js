import * as types from "./actionType";

const initState = {
  users: [],
  isLoading: false,
  isError: false,
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ALL_USER_REQUEST:
      return { ...state, isLoading: true };
    case types.GET_ALL_USER_SUCCESS:
      return { ...state, isLoading: false, users: payload, searchs: [] };
    case types.GET_ALL_USER_ERROR:
      return { ...state, isLoading: false, isError: true };
    // case types.GET_SEARCH_USER_REQUEST:
    //   return { ...state, isLoading: true };
    // case types.GET_SEARCH_USER_SUCCESS:
    //   return { ...state, isLoading: false, users: payload };
    // case types.GET_SEARCH_USER_ERROR:
    //   return { ...state, isLoading: false, isError: true };
    default:
      return state;
  }
};

export { reducer };
