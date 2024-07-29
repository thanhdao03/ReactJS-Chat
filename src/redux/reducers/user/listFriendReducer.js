import * as types from "../../actions/user/constantsUser";
const initialState = {
  loading: false,
  friends: [],
  error: null,
};

const friendsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LIST_FRIENDS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_LIST_FRIENDS_SUCCESS:
      return {
        ...state,
        loading: false,
        friends: action.payload,
      };
    case types.GET_LIST_FRIENDS_FAILURE:
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
