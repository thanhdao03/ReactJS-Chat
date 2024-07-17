import { message } from "antd";
import * as types from "./types";
import apiRoute from "../../Services/api";

const authAction = {
  login: (userDataLogin) => async (dispatch) => {
    try {
      const res = await apiRoute.login(userDataLogin);
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
      localStorage.setItem("token", res.data.data.token);
      message.success("Đăng nhập thành công");
    } catch (e) {
      dispatch({ type: types.LOGIN_FAILURE, payload: e.message });
      message.error(e.message);
    }
  },
  register: (userData) => async (dispatch) => {
    try {
      const res = await apiRoute.register(userData);
      dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
      localStorage.setItem("token", res.data.data.token);
      message.success("Đăng ký thành công");
    } catch (e) {
      dispatch({ type: types.REGISTER_FAILURE, payload: e.message });
      message.error(e.message);
    }
  },
};
export default authAction;
