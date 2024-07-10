import { message } from "antd";
import axios from "axios";
import { baseUrl } from "../../Services/api";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
} from "./actionTypes";
export const login = (userDataLogin) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post(`${baseUrl}/auth/login`, userDataLogin, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    localStorage.setItem("token", res.data.data.token);
    message.success("Đăng nhập thành công");
  } catch (e) {
    dispatch({ type: LOGIN_FAILURE, payload: e.message });
    message.error(e.message);
  }
};

export const register = (userData) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });
  try {
    const res = await axios.post(`${baseUrl}/auth/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    localStorage.setItem("token", res.data.data.token);
    message.success("Đăng ký thành công");
  } catch (e) {
    dispatch({ type: REGISTER_FAILURE, payload: e.message });
    message.error(e.message);
  }
};