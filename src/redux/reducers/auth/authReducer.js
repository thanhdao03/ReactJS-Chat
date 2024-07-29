import * as types from "../../actions/auth/constantsAuth.js";
const initialState = {
  loading: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
    case types.REGISTER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.LOGIN_SUCCESS:
    case types.REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case types.LOGIN_FAILURE:
    case types.REGISTER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
