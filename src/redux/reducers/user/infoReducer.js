import * as types from "../../actions/user/constantsUser";

const initialState = {
  loading: false,
  userInfo: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INFO_REQUEST:
    case types.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.GET_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload.data,
      };
    case types.GET_INFO_FAILURE:
    case types.UPDATE_USER_FAILURE:
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
