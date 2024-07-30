import "./Register.scss";
import { Link } from "react-router-dom";
import { Image } from "antd";
import { ImageLogo } from "../../common/components/image/imageLogo";
import FormRegister from "../../components/form/formRegister/registerForm";

function Register() {
  return (
    <>
      <div className="body">
        <header className="logo">
          <ImageLogo />
        </header>
        <div className="content-register">
          <div className="image-register">
            <Image
              preview={false}
              className="image2"
              src={require("../../assets/images/image2.png")}
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
            <p className="text-lass-register">
              Đã có tài khoản, đăng nhập tại <Link to="/">đây!</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
