import "./Register.scss";
import { Link } from "react-router-dom";
import { Button, Image, Input, Form } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { apiRegister } from "../../Services/apiConfig";
import { validateRegister } from "../../utils/Validates";
function Register() {
  const [fullname, setFullname] = useState("");
  const [acc, setAcc] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateRegister(fullname, acc, pass, confirmPass)) {
      return;
    }
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
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className="body">
        <header className="logo">
          <Image
            src={require("../../assets/Images/logo.png")}
            preview={false}
          />
        </header>
        <div className="content-register">
          <div className="image-register">
            <Image
              preview={false}
              className="image2"
              src={require("../../assets/Images/image2.png")}
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
