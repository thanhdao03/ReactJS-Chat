import { Button, Image, Input, Form, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authAction from "../redux/actions/auth/authAction";
import "../assets/styles/Login.scss";
import { useEffect, useState } from "react";
import { validateLogin, handleError } from "../utils/validates";

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
        // includes  giúp log lỗi đúng chỗ khi nó kiểm tra chuỗi trong nó
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
      } else if (error.statusE === 500) {
      }
    }
  }, [error]);
  console.log(error);
  useEffect(() => {
    if (user && !error) {
      navigate("/chat");
    }
  }, [user, error, navigate]);

  return (
    <>
      <Form
        className="form-login-post"
        method="POST"
        form={form}
        type="submit"
        initialValues={{ acc, pass }}
      >
        <Form.Item
          name="acc"
          validateStatus={accError ? "error" : ""}
          help={accError}
        >
          <Input
            className="form-input"
            onChange={(e) => setAcc(e.target.value)}
            autoComplete="acc"
            placeholder="Nhập tài khoản"
            type="text"
            value={acc}
            onFocus={() => handleFocus("acc")}
          />
        </Form.Item>
        <Form.Item
          name="pass"
          validateStatus={passError ? "error" : ""}
          help={passError}
        >
          <Input
            className="form-input"
            onChange={(e) => setPass(e.target.value)}
            placeholder="**********"
            type="password"
            autoComplete="pass"
            value={pass}
            onFocus={() => handleFocus("pass")}
          />
        </Form.Item>
        <p className="remember-pass">
          <Link to="/">Quên mật khẩu ?</Link>
        </p>
        <p
          className="b"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            color: "red",
          }}
        >
          {" "}
          {loading ? <Spin /> : error ? <>{error.message}</> : null}
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
          <Image src={require("../assets/images/gg.png")} preview={false} />
          <Image src={require("../assets/images/fb.png")} preview={false} />
          <Image src={require("../assets/images/gg.png")} preview={false} />
        </div>
      </Form>
    </>
  );
}
export default FormLogin;
