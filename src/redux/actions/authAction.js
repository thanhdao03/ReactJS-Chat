import { message } from "antd";
import axios from "axios";
import { baseUrl } from "../../Services/api"; // Bạn có thể giữ baseUrl như cũ

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = (userDataLogin) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  try {
    const res = await axios.post(`${baseUrl}/auth/login`, userDataLogin, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    localStorage.setItem("Fullname", res.data.data.FullName);
    localStorage.setItem("token", res.data.data.token);
    localStorage.setItem("Username", res.data.data.Username);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    message.success("Đăng nhập thành công");
  } catch (e) {
    dispatch({ type: LOGIN_FAILURE, payload: e.message });
    message.error(e.message);
  }
};
