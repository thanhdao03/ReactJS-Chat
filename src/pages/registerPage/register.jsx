import "./Register.scss";
import { Link } from "react-router-dom";
import { Image } from "antd";
import { ImageLogo } from "../../common/components/image/imageLogo";
import FormRegister from "../../components/form/formRegister/registerForm";
import { useTranslation } from "react-i18next";

function Register() {
  const { t, i18n } = useTranslation();
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
            <div className="form-register-header">
              <select
                style={{
                  height: "30px",
                  justifyContent: "center",
                  marginTop: "10px",
                }}
                onChange={(e) => i18n.changeLanguage(e.target.value)}
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">Tiếng Anh</option>
              </select>
              <p>
                <Link style={{ textDecoration: "none" }} to="/">
                  {t("login.login")}
                </Link>
              </p>
              <p>
                <Link style={{ textDecoration: "none" }} to="/signup">
                  {t("login.signUpLink")}
                </Link>
              </p>
            </div>
            <p className="text-register">{t("register.register")}</p>
            <FormRegister />
            <p className="text-lass-register">
              {t("register.alreadyHaveAccount")}{" "}
              <Link to="/">{t("register.loginHere")}</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
