import {
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  SET_LOADING,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  DELETE_USER_ERROR,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === SET_LOADING) {
    return { ...state, isLoading: true, showAlert: false };
  }

  if (action.type === FETCH_USERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: action.payload,
    };
  }
  if (action.type === FETCH_USERS_ERROR) {
    return { ...state, isLoading: false };
  }
  if (action.type === CREATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: [...state.users, action.payload],
    };
  }
  if (action.type === CREATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    };
  }

  if (action.type === DELETE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
    };
  }

  throw new Error(`no such action : ${action}`);
};

export default reducer;
