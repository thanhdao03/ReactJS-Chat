import { Image } from "antd";
import { Link } from "react-router-dom";
import "./Login.scss";
import FormLogin from "../../components/form/formLogin/loginForm";
import { ImageLogo } from "../../common/components/image/imageLogo";

function Login() {
  return (
    <>
      <div className="body">
        <header className="logo">
          <ImageLogo />
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
              src={require("../../assets/images/image1.png")}
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
            <p className="text-lass">Hoặc tiếp tục với</p>
            <div className="logo-login">
              <Image
                src={require("../../assets/images/gg.png")}
                preview={false}
              />
              <Image
                src={require("../../assets/images/fb.png")}
                preview={false}
              />
              <Image
                src={require("../../assets/images/gg.png")}
                preview={false}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
