import "../../assets/styles/Register.scss";
import { Link } from "react-router-dom";
import {  Image,  } from "antd";
import FormRegister from "../../Components/formRegister";
function Register() {
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
              <select
                style={{
                  height: "30px",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
              >
                <option>Tiếng Việt</option>
                <option>Tiếng Anh</option>
              </select>
              <p>
                <Link style={{ textDecoration: "none" }} to="/">
                  Đăng nhập
                </Link>
              </p>
              <p>
                <Link style={{ textDecoration: "none" }} to="/signup">
                  Đăng ký
                </Link>
              </p>
            </div>
            <p className="text-register">Đăng ký</p>
            <FormRegister />
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
