import { message } from "antd";
import axios from "axios";
import { baseUrl } from "../../Services/api";
import {
  GET_INFO_FAILURE,
  GET_INFO_REQUEST,
  GET_INFO_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAILURE,
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAILURE,
  GET_LIST_FRIENDS_REQUEST,
  GET_LIST_FRIENDS_SUCCESS,
  GET_LIST_FRIENDS_FAILURE,
} from "./actionTypes";
import { getToken } from "../../Services/api";
export const getInfo = () => async (dispatch) => {
  dispatch({ type: GET_INFO_REQUEST });
  try {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const res = await axios.get(`${baseUrl}/user/info`, { headers });
    dispatch({ type: GET_INFO_SUCCESS, payload: res.data.data });
  } catch (e) {
    dispatch({ type: GET_INFO_FAILURE, payload: e.message });
  }
};
export const updateUser = (formData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });
  try {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const res = await axios.post(`${baseUrl}/user/update`, formData, {
      headers,
    });
    dispatch({ type: UPDATE_USER_SUCCESS, payload: res.data });
    message.success("Update success");
  } catch (e) {
    dispatch({ type: UPDATE_USER_FAILURE, payload: e.message });
    message.error(e.message);
  }
};
export const sendMessage = (messageData) => async (dispatch) => {
  dispatch({ type: SEND_MESSAGE_REQUEST });
  try {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const res = await axios.post(`${baseUrl}/message/send`, messageData, {
      headers,
    });
    dispatch({ type: SEND_MESSAGE_SUCCESS, payload: res.data });
    message.success("Tin nhắn đã được gửi");
  } catch (e) {
    dispatch({ type: SEND_MESSAGE_FAILURE, payload: e.message });
    message.error(e.message);
  }
};

// Get messages action
export const getMessages = () => async (dispatch) => {
  dispatch({ type: GET_MESSAGES_REQUEST });
  try {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const res = await axios.get(`${baseUrl}/message`, { headers });
    dispatch({ type: GET_MESSAGES_SUCCESS, payload: res.data });
  } catch (e) {
    dispatch({ type: GET_MESSAGES_FAILURE, payload: e.message });
  }
};

// Get list friends action
export const getListFriends = () => async (dispatch) => {
  dispatch({ type: GET_LIST_FRIENDS_REQUEST });
  try {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const res = await axios.get(`${baseUrl}/message/list-friend`, { headers });
    dispatch({ type: GET_LIST_FRIENDS_SUCCESS, payload: res.data.data });
  } catch (e) {
    dispatch({ type: GET_LIST_FRIENDS_FAILURE, payload: e.message });
  }
};
