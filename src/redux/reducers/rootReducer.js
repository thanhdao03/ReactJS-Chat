import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import userReducer from "./user/infoReducer";
import messagesReducer from "./user/messageReducer";
import friendsReducer from "./user/listFriendReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  friends: friendsReducer,
  chat: messagesReducer,
});

export default rootReducer;
