import "./Register.scss";
import { Link } from "react-router-dom";
import { Button, Image, Input, Form, message } from "antd";
import { useEffect, useState } from "react";
import { apiRegister } from "../../Services/apiConfig";
function Register() {
  const [fullname, setFullname] = useState("");
  const [acc, setAcc] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("unmount");
    };
  }, []);
  const handleRegister = async (e) => {
    e.preventDefault();
    const userData = {
      FullName: fullname,
      Username: acc,
      Password: pass,
    };
    try {
      const data = await apiRegister(userData);
      localStorage.setItem("Fullname", data.data.FullName);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("Username", data.data.Username);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="body">
        <header className="logo">
          <Image src={require("../../assets/logo.png")} alt="" />
        </header>
        <div className="content-register">
          <div className="image-register">
            <Image
              className="image2"
              src={require("../../assets/image2.png")}
            />
          </div>
          <div className="form-register">
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
            <p className="text-register">Đăng ký</p>
            <Form className="form-register-post" method="POST">
              <Input
                className="form-input-register"
                placeholder="Nhập họ tên"
                type="text"
                name="FullName"
                onChange={(e) => {
                  setFullname(e.target.value);
                }}
                value={fullname}
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
              />
              <Input
                className="form-input-register"
                onChange={(e) => {}}
                placeholder="Nhập lại mật khẩu"
                type="password"
              />
              <Button
                className="form-btn-login-register"
                type="primary"
                onClick={handleRegister}
              >
                Đăng ký
              </Button>
              <p className="text-lass-register">
                Đã có tài khoản, đăng nhập tại <Link to="/login">đây!</Link>
              </p>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
