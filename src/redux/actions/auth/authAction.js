import { message } from "antd";
import * as types from "./constantsAuth";
import apiRoute from "../../../common/helpers/api";
const errorLog = "Mất kết nối server";

const authAction = {
  login: (userDataLogin) => async (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST });
    try {
      const res = await apiRoute.login(userDataLogin);
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
      localStorage.setItem("token", res.data.data.token);
      message.success("Đăng nhập thành công");
    } catch (error) {
      // const errorMessage =
      //   error.response?.data?.message || "Mất kết nối server";
      // const errorCode = error.response?.status || 500;
      // const messageE = errorLog;
      dispatch({
        // type: types.LOGIN_FAILURE,
        // payload: { message: errorMessage, status: errorCode, error: messageE },
        type: types.LOGIN_FAILURE,
        payload: error.message,
      });
    }
  },
  register: (userData) => async (dispatch) => {
    dispatch({ type: types.REGISTER_REQUEST });
    try {
      const res = await apiRoute.register(userData);
      dispatch({ type: types.REGISTER_SUCCESS, payload: res.data });
      localStorage.setItem("token", res.data.data.token);
      message.success("Đăng ký thành công");
    } catch (error) {
      // const errorMessage =
      //   error.response?.data?.message || "Mất kết nối server";
      // const errorCode = error.response?.status || 500;
      // const messageB = errorLog;
      dispatch({
        // type: types.REGISTER_FAILURE,
        // payload: { message: errorMessage, status: errorCode, errorB: messageB },
        type: types.REGISTER_FAILURE,
        payload: error.message,
      });
    }
  },
};
export default authAction;
