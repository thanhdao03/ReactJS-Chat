import "../assets/styles/Register.scss";
import { Link } from "react-router-dom";
import { Button, Input, Form } from "antd";
import useRegister from "../hooks/useRegister";
function FormRegister() {
    const {
        fullname,
        acc,
        pass,
        confirmPass,
        setFullname,
        setAcc,
        setPass,
        setConfirmPass,
        handleRegister,
      } = useRegister();
    return(
        <> <Form className="form-register-post" method="POST">
        <Input
          className="form-input-register"
          placeholder="Nhập họ tên"
          type="text"
          name="FullName"
          onChange={(e) => {
            setFullname(e.target.value);
          }}
          value={fullname}
          autoComplete="FullName"
        />
        <Input
          className="form-input-register"
          onChange={(e) => {
            setAcc(e.target.value);
          }}
          value={acc}
          placeholder="Nhập tài khoản"
          type="text"
          name="Username"
          autoComplete="Username"
        />
        <Input
          className="form-input-register"
          onChange={(e) => {
            setPass(e.target.value);
          }}
          value={pass}
          placeholder="Nhập mật khẩu"
          type="password"
          name="Password"
          autoComplete="Password"
        />
        <Input
          className="form-input-register"
          value={confirmPass}
          onChange={(e) => {
            setConfirmPass(e.target.value);
          }}
          placeholder="Nhập lại mật khẩu"
          type="password"
          autoComplete="confirmPassword"
        />
        <Button
          className="form-btn-login-register"
          type="primary"
          onClick={handleRegister}
        >
          Đăng ký
        </Button>
        <p className="text-lass-register">
          Đã có tài khoản, đăng nhập tại <Link to="/">đây!</Link>
        </p>
      </Form></>
    )
}
export default FormRegister;
