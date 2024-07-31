import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  validateRegister,
  handleError,
} from "../../../common/untils/validates";
import authAction from "../../../redux/actions/auth/authAction";
import "../../../pages/registerPage/Register.scss";
import { ButtonRegister } from "../../../common/components/button/buttonRegister";
import InputField from "../../../common/components/input/registerInputField";
import LoadingError from "../../../common/components/error/registerError"
import "./registerForm.scss";

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
        <InputField
          name="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          placeholder="Nhập họ tên"
          type="text"
          autoComplete="FullName"
          validateStatus={fullnameError ? "error" : ""}
          help={fullnameError}
          onFocus={() => handleFocus("fullname")}
        />
        <InputField
          name="acc"
          value={acc}
          onChange={(e) => setAcc(e.target.value)}
          placeholder="Nhập tài khoản"
          type="text"
          autoComplete="Username"
          validateStatus={accError ? "error" : ""}
          help={accError}
          onFocus={() => handleFocus("acc")}
        />
        <InputField
          name="pass"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Nhập mật khẩu"
          type="password"
          autoComplete="Password"
          validateStatus={passError ? "error" : ""}
          help={passError}
          onFocus={() => handleFocus("pass")}
        />
        <InputField
          name="confirmPass"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          placeholder="Nhập lại mật khẩu"
          type="password"
          autoComplete="confirmPassword"
          validateStatus={confirmPassError ? "error" : ""}
          help={confirmPassError}
          onFocus={() => handleFocus("confirmPass")}
        />
        <LoadingError loading={loading} error={error} />
        <ButtonRegister handleRegister={handleRegister} />
      </Form>
    </>
  );
}

export default FormRegister;
