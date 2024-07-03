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
export const validateRegister = (fullname, acc, pass, confirmPass) => {
  if (!fullname) {
    message.error("FullName không được để trống");
    return false;
  }
  if (!acc) {
    message.error("Tài khoản không được để trống");
    return false;
  }
  if (!pass) {
    message.error("Mật khẩu không để trống");
    return false;
  }
  if (!confirmPass) {
    message.error("Vui lòng nhập lại mật khẩu");
    return false;
  }
  if (confirmPass !== pass) {
    message.error("Mật khẩu không không trùng");
    return false;
  }
  return true;
};
