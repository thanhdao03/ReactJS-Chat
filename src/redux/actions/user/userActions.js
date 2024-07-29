import { message } from "antd";
import * as types from "./constantsUser";
import apiRoute from "../../../service/api";
const userAction = {
  getInfo: () => async (dispatch) => {
    dispatch({ type: types.GET_INFO_FAILURE });
    try {
      const res = await apiRoute.getInfo();
      dispatch({ type: types.GET_INFO_SUCCESS, payload: res.data.data });
    } catch (e) {
      dispatch({ type: types.GET_INFO_FAILURE, payload: e.message });
    }
  },
  updateUser: (formData) => async (dispatch) => {
    dispatch({ type: types.UPDATE_USER_REQUEST });
    try {
      const res = await apiRoute.updateUser(formData);
      dispatch({ type: types.UPDATE_USER_SUCCESS, payload: res.data });
      message.success("Update success");
    } catch (e) {
      dispatch({ type: types.UPDATE_USER_FAILURE, payload: e.message });
    }
  },
  getListFriends: () => async (dispatch) => {
    dispatch({ type: types.GET_LIST_FRIENDS_REQUEST });
    try {
      const res = await apiRoute.getListFriends();
      dispatch({
        type: types.GET_LIST_FRIENDS_SUCCESS,
        payload: res.data.data,
      });
    } catch (e) {
      dispatch({ type: types.GET_LIST_FRIENDS_FAILURE, payload: e.message });
    }
  },
  sendMessage: (friendID, content, fileList) => async (dispatch) => {
    dispatch({ type: types.SEND_MESSAGE_REQUEST });
    try {
      const res = await apiRoute.sendMessage(friendID, content, fileList);
      dispatch({ type: types.SEND_MESSAGE_SUCCESS, payload: res.data.data });
    } catch (e) {
      dispatch({ type: types.SEND_MESSAGE_FAILURE, payload: e.message });
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
      }
    },
};
export default userAction;
