import { combineReducers } from "redux";
import authReducer from "./authReducer";
import userReducer from "./infoReducer";
import messagesReducer from "./messageReducer";
import friendsReducer from "./listFriendReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  friends: friendsReducer,
  messages: messagesReducer,
});

export default rootReducer;
