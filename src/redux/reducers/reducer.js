import {
  GET_INFO_REQUEST,
  GET_INFO_SUCCESS,
  GET_INFO_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INFO_REQUEST:
    case UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload.data,
      };
    case GET_INFO_FAILURE:
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
