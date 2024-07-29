import * as types from "../../actions/user/constantsUser";

const initialState = {
  loading: false,
  messages: [],
  error: null,
};

const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SEND_MESSAGE_REQUEST:
    case types.GET_MESSAGES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.payload],
      };
    case types.GET_MESSAGES_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload,
      };
    case types.SEND_MESSAGE_FAILURE:
    case types.GET_MESSAGES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default messagesReducer;
