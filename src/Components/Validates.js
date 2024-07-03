import { message } from "antd";
export const validateLogin = (acc, pass) => {
  if (!acc) {
    message.error("Tài khoản không được để trống");
    return false;
  }
  if (!pass) {
    message.error("Mật khẩu không để trống");
    return false;
  }
  return true;
};
