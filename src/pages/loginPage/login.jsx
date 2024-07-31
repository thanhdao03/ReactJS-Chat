import { Image } from "antd";
import { Link } from "react-router-dom";
import "./Login.scss";
import FormLogin from "../../components/form/formLogin/loginForm";
import { ImageLogo } from "../../common/components/image/imageLogo";
import { useTranslation } from "react-i18next";
import React from "react";

function Login() {
  const { t, i18n } = useTranslation();
  const newlineToBreak = (text) =>
    text.split("\n").map((str, index) => (
      <React.Fragment key={index}>
        {str}
        <br />
      </React.Fragment>
    ));

  return (
    <>
      <div className="body">
        <header className="logo">
          <ImageLogo />
        </header>
        <div className="content-body">
          <div className="text-all">
            <p className="text-first">{newlineToBreak(t("login.welcome"))}</p>
            <p className="text-second">
              {newlineToBreak(t("login.signUp"))} <br />
              <Link to="/signup">{t("login.signUpLink")}</Link>
            </p>
          </div>
          <div className="image-layout">
            <Image
              className="image1"
              preview={false}
              src={require("../../assets/images/image1.png")}
            />
          </div>
          <div className="form-login">
            <div className="form-login-header">
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
            <FormLogin />
            <p className="text-lass">{t("login.orContinueWith")}</p>
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
