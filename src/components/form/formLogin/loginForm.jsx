import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authAction from "../../../redux/actions/auth/authAction";
import { validateLogin, handleError } from "../../../common/untils/validates";
import LoginError from "./loginError";
import LoginInput from "../../../common/components/input/loginInput";
import { ButtonLogin } from "../../../common/components/button/buttonLogin";
import "./loginForm.scss";
import "../../../pages/loginPage/Login.scss";

function FormLogin() {
  const [acc, setAcc] = useState("daoptc");
  const [pass, setPass] = useState("123");
  const [accError, setAccError] = useState(null);
  const [passError, setPassError] = useState(null);

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, loading, error } = useSelector((state) => state.auth);
  const { login } = authAction;

  const handleFocus = (field) => {
    if (field === "acc") {
      setAccError(null);
    } else if (field === "pass") {
      setPassError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDataLogin = { Username: acc, Password: pass };
    const validationError = validateLogin(acc, pass);
    if (validationError) {
      if (validationError.includes("Tài khoản")) {
        setAccError(validationError);
      } else if (validationError.includes("Mật khẩu")) {
        setPassError(validationError);
      }
      return;
    }
    dispatch(login(userDataLogin));
  };

  useEffect(() => {
    if (error) {
      if (error.status === 400) {
        setAccError(handleError(error));
        setTimeout(() => {
          setAccError(null);
        }, 1000);
      } else if (error.status === 401) {
        setPassError(handleError(error));
        setTimeout(() => {
          setPassError(null);
        }, 1000);
      }
    }
  }, [error]);

  useEffect(() => {
    if (user && !error) {
      navigate("/chat");
    }
  }, [user, error, navigate]);

  return (
    <Form
      className="form-login-post"
      method="POST"
      form={form}
      type="submit"
      initialValues={{ acc, pass }}
    >
      <LoginInput
        name="acc"
        value={acc}
        placeholder="Nhập tài khoản"
        type="text"
        onChange={(e) => setAcc(e.target.value)}
        onFocus={() => handleFocus("acc")}
        validateStatus={accError ? "error" : ""}
        help={accError}
      />
      <LoginInput
        name="pass"
        value={pass}
        placeholder="**********"
        type="password"
        onChange={(e) => setPass(e.target.value)}
        onFocus={() => handleFocus("pass")}
        validateStatus={passError ? "error" : ""}
        help={passError}
      />
      <p className="remember-pass">
        <Link to="/">Quên mật khẩu ?</Link>
      </p>
      <LoginError loading={loading} error={error} />
      <ButtonLogin handleSubmit={handleSubmit} />
    </Form>
  );
}

export default FormLogin;
