import { Button } from "antd";

export const ButtonLogin = ({ handleSubmit }) => {
  return (
    <div>
      <Button className="form-btn-login" onClick={handleSubmit} type="primary">
        Đăng nhập
      </Button>
    </div>
  );
};
