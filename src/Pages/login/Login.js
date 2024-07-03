import { Link } from "react-router-dom";
import "./Login.scss";
import { Button, Image, Input, Form, message } from "antd";
import { useEffect, useState } from "react";
import { apiLogn } from "../../Services/apiConfig";
import { validateLogin } from "../../Components/Validates";
function Login() {
  const [acc, setAcc] = useState("daoptc");
  const [pass, setPass] = useState("123");
  useEffect(() => {
    return () => {
      console.log("unmount");
    };
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin(acc, pass)) {
      return;
    }
    const userDataLogin = {
      Username: acc,
      Password: pass,
    };
    try {
      const data = await apiLogn(userDataLogin);
      localStorage.setItem("Fullname", data.data.FullName);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("Username", data.data.Username);
    } catch {
      console.log("failed");
    }
  };
  return (
    <>
      <div className="body">
        <header className="logo">
          <Image src={require("../../assets/logo.png")} alt="" />
        </header>
        <div className="content-body">
          <div className="text-all">
            <p className="text-first">
              Đăng nhập để <br />
              kết nối
            </p>
            <p className="text-second">
              Nếu chưa có tài khoản Đăng <br />
              Đăng ký tại <Link to="/signup">đây</Link>
            </p>
          </div>
          <div className="image-layout">
            <Image
              className="image1"
              src={require("../../assets/image1.png")}
            ></Image>
          </div>
          <div className="form-login">
            <div className="form-login-header">
              <select>
                <option>Tiếng Việt</option>
                <option>Tiếng Anh</option>
              </select>
              <p>
                <Link to="/login">Đăng nhập</Link>
              </p>
              <p>
                <Link to="/signup">Đăng ký</Link>
              </p>
            </div>
            <Form className="form-login-post" method="POST" type="submit">
              <Input
                className="form-input"
                onChange={(e) => {
                  setAcc(e.target.value);
                }}
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
                <Image src={require("../../assets/gg.png")} />
                <Image src={require("../../assets/fb.png")} />
                <Image src={require("../../assets/gg.png")} />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
