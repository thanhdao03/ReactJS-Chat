export const validateLogin = (acc, pass) => {
  if (!acc) {
    return "Tài khoản không được để trống";
  }
  if (!pass) {
    return "Mật khẩu không để trống";
  }
  return null;
};
export const handleError = (error) => {
  if (error) {
    if (error.status === 400) {
      return "Mời nhập lại tài khoản";
    } else if (error.status === 401) {
      return "Mời nhập lại mật khẩu";
    } else {
      return null;
    }
  }
  return null;
};
export const validateRegister = (fullname, acc, pass, confirmPass) => {
  if (!fullname) {
    return "FullName không được để trống";
  }
  if (!acc) {
    return "Tài khoản không được để trống";
  }
  if (!pass) {
    return "Mật khẩu không để trống";
  }
  if (!confirmPass) {
    return "Vui lòng nhập lại mật khẩu";
  }
  if (confirmPass !== pass) {
    return "Mật khẩu không không trùng";
  }
  return null;
};
