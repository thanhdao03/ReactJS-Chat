import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRegister } from "../Services/api";
import { validateRegister } from "../utils/Validates";

const useRegister = () => {
  const [fullname, setFullname] = useState("");
  const [acc, setAcc] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateRegister(fullname, acc, pass, confirmPass)) {
      return;
    }
    const userData = {
      FullName: fullname,
      Username: acc,
      Password: pass,
    };
    try {
      const data = await apiRegister(userData);
      localStorage.setItem("Fullname", data.data.FullName);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("Username", data.data.Username);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return {
    fullname,
    acc,
    pass,
    confirmPass,
    setFullname,
    setAcc,
    setPass,
    setConfirmPass,
    handleRegister,
  };
};

export default useRegister;
