import { Image } from "antd";
import { Link } from "react-router-dom";
import "../assets/styles/Login.scss";
import FormLogin from "../components/formLogin";
function Login() {
  return (
    <>
      <div className="body">
        <header className="logo">
          <Image src={require("../assets/images/logo.png")} preview={false} />
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
              preview={false}
              src={require("../assets/images/image1.png")}
            ></Image>
          </div>
          <div className="form-login">
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
            <FormLogin />
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
