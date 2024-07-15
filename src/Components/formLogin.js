import { Button, Image, Input, Form } from "antd";
import { Link } from "react-router-dom";
import "../assets/styles/Login.scss";
import useLogin from "../hooks/useLogin";
function FormLogin() {
    const { acc, pass, setAcc, setPass, handleSubmit } = useLogin();
  return (
    <>
      {" "}
      <Form className="form-login-post" method="POST" type="submit">
        <Input
          className="form-input"
          onChange={(e) => {
            setAcc(e.target.value);
          }}
          autoComplete="acc"
          placeholder="Nhập tài khoản"
          type="text"
          value={acc}
        />
        <Input
          className="form-input"
          onChange={(e) => {
            setPass(e.target.value);
          }}
          placeholder="**********"
          type="password"
          autoComplete="pass"
          value={pass}
        />
        <p className="remember-pass">
          <Link to="/">Quên mật khẩu ?</Link>
        </p>
        <Button
          className="form-btn-login"
          onClick={handleSubmit}
          type="primary"
        >
          Đăng nhập
        </Button>
        <p className="text-lass">Hoặc tiếp tục với</p>
        <div className="logo-login">
          <Image src={require("../assets/Images/gg.png")} preview={false} />
          <Image src={require("../assets/Images/fb.png")} preview={false} />
          <Image src={require("../assets/Images/gg.png")} preview={false} />
        </div>
      </Form>
    </>
  );
}
export default FormLogin;
