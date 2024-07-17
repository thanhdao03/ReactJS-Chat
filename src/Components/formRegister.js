import "../assets/styles/Register.scss";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Form, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateRegister, handleError } from "../utils/Validates";
import authAction from "../redux/actions/authAction";

function FormRegister() {
  const [fullname, setFullname] = useState("");
  const [acc, setAcc] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [fullnameError, setFullnameError] = useState(null);
  const [accError, setAccError] = useState(null);
  const [passError, setPassError] = useState(null);
  const [confirmPassError, setConfirmPassError] = useState(null);
  const [serverError, setServerError] = useState(null);

  const { register } = authAction;
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const checkRegister = () => {
    const validationError = validateRegister(fullname, acc, pass, confirmPass);
    if (validationError) {
      if (validationError.includes("FullName")) {
        setFullnameError(validationError);
      } else if (validationError.includes("Tài khoản")) {
        setAccError(validationError);
      } else if (validationError.includes("Mật khẩu")) {
        setPassError(validationError);
      } else if (
        validationError.includes("Vui lòng nhập lại mật khẩu") ||
        validationError.includes("không trùng")
      ) {
        setConfirmPassError(validationError);
      }
      return false;
    }
    return true;
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!checkRegister()) {
      return;
    }
    setFullnameError(null);
    setAccError(null);
    setPassError(null);
    setConfirmPassError(null);
    setServerError(null);
    const userData = {
      FullName: fullname,
      Username: acc,
      Password: pass,
    };
    try {
      dispatch(register(userData));
    } catch (e) {
      console.log(e);
    }
  };
  const handleFocus = (field) => {
    if (field === "fullname") {
      setFullnameError(null);
    } else if (field === "acc") {
      setAccError(null);
    } else if (field === "pass") {
      setPassError(null);
    } else if (field === "confirmPass") {
      setConfirmPassError(null);
    }
  };
  useEffect(() => {
    if (error) {
      if (error.status === 400) {
        setAccError(handleError(error));
        setTimeout(() => {
          setAccError(null);
        }, 2000);
      }
    }
  }, [error]);
  useEffect(() => {
    if (user && !error) {
      navigate("/chat");
    }
  }, [user, error, navigate]);
  return (
    <>
      <Form className="form-register-post" method="POST">
        <Form.Item
          validateStatus={fullnameError ? "error" : ""}
          help={fullnameError}
        >
          <Input
            className="form-input-register"
            placeholder="Nhập họ tên"
            type="text"
            name="fullname"
            onChange={(e) => {
              setFullname(e.target.value);
            }}
            value={fullname}
            autoComplete="FullName"
            onFocus={() => handleFocus("fullname")}
          />
        </Form.Item>
        <Form.Item validateStatus={accError ? "error" : ""} help={accError}>
          <Input
            className="form-input-register"
            onChange={(e) => {
              setAcc(e.target.value);
            }}
            value={acc}
            placeholder="Nhập tài khoản"
            type="text"
            name="acc"
            autoComplete="Username"
            onFocus={() => handleFocus("acc")}
          />
        </Form.Item>
        <Form.Item validateStatus={passError ? "error" : ""} help={passError}>
          <Input
            className="form-input-register"
            onChange={(e) => {
              setPass(e.target.value);
            }}
            value={pass}
            placeholder="Nhập mật khẩu"
            type="password"
            name="pass"
            autoComplete="Password"
            onFocus={() => handleFocus("pass")}
          />
        </Form.Item>
        <Form.Item
          validateStatus={confirmPassError ? "error" : ""}
          help={confirmPassError}
        >
          <Input
            className="form-input-register"
            value={confirmPass}
            onChange={(e) => {
              setConfirmPass(e.target.value);
            }}
            placeholder="Nhập lại mật khẩu"
            type="password"
            name="pass"
            autoComplete="confirmPassword"
            onFocus={() => handleFocus("confirmPass")}
          />
        </Form.Item>
        <p
          className="a"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            color: "red",
          }}
        >
          {" "}
          {loading ? <Spin /> : error ? <>{error.errorB}</> : null}
        </p>
        <Button
          className="form-btn-login-register"
          type="primary"
          onClick={handleRegister}
        >
          Đăng ký
        </Button>
        <p className="text-lass-register">
          Đã có tài khoản, đăng nhập tại <Link to="/">đây!</Link>
        </p>
      </Form>
    </>
  );
}

export default FormRegister;
