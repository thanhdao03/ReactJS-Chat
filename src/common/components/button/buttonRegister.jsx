import { Button } from "antd";
import "../../../pages/registerPage/Register.scss";
export const ButtonRegister = ({ handleRegister }) => {
  return (
    <div>
      <Button
        className="form-btn-login-register"
        type="primary"
        onClick={handleRegister}
      >
        Đăng ký
      </Button>
    </div>
  );
};
