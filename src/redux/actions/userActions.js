import { message } from "antd";
import * as types from "./types";
import apiRoute from "../../Services/api";
const userAction = {
  getInfo: () => async (dispatch) => {
    try {
      const res = await apiRoute.getInfo();
      dispatch({ type: types.GET_INFO_SUCCESS, payload: res.data.data });
    } catch (e) {
      dispatch({ type: types.GET_INFO_FAILURE, payload: e.message });
      message.error(e.message);
    }
  },
  updateUser: (formData) => async (dispatch) => {
    try {
      const res = await apiRoute.updateUser(formData);
      dispatch({ type: types.UPDATE_USER_SUCCESS, payload: res.data });
      message.success("Update success");
    } catch (e) {
      dispatch({ type: types.UPDATE_USER_FAILURE, payload: e.message });
      message.error(e.message);
    }
  },
  getListFriends: () => async (dispatch) => {
    try {
      const res = await apiRoute.getListFriends();
      dispatch({
        type: types.GET_LIST_FRIENDS_SUCCESS,
        payload: res.data.data,
      });
    } catch (e) {
      dispatch({ type: types.GET_LIST_FRIENDS_FAILURE, payload: e.message });
      message.error(e.message);
    }
  },
  sendMessage: (friendID, content, fileList) => async (dispatch) => {
    try {
      const res = await apiRoute.sendMessage(friendID, content, fileList);
      dispatch({ type: types.SEND_MESSAGE_SUCCESS, payload: res.data.data });
      message.success("Tin nhắn đã được gửi");
    } catch (e) {
      dispatch({ type: types.SEND_MESSAGE_FAILURE, payload: e.message });
      message.error(e.message);
    }
  },
  getMessages:
    (friendID, lastTime = null) =>
    async (dispatch) => {
      dispatch({ type: types.GET_MESSAGES_REQUEST });
      try {
        const res = await apiRoute.getMessages(friendID, (lastTime = null));
        dispatch({ type: types.GET_MESSAGES_SUCCESS, payload: res.data.data });
      } catch (e) {
        dispatch({ type: types.GET_MESSAGES_FAILURE, payload: e.message });
        message.error(e.message);
      }
    },
};
export default userAction;
