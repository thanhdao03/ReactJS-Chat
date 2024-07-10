import {
  GET_LIST_FRIENDS_REQUEST,
  GET_LIST_FRIENDS_SUCCESS,
  GET_LIST_FRIENDS_FAILURE,
} from "../actions/actionTypes";

const initialState = {
  loading: false,
  friends: [],
  error: null,
};

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_FRIENDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_LIST_FRIENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        friends: action.payload,
      };
    case GET_LIST_FRIENDS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default friendsReducer;
