import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLogn } from "../Services/api";
import { validateLogin } from "../utils/Validates";

const useLogin = () => {
  const [acc, setAcc] = useState("daoptc");
  const [pass, setPass] = useState("123");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateLogin(acc, pass)) {
      return;
    }
    const userDataLogin = {
      Username: acc,
      Password: pass,
    };
    try {
      const data = await apiLogn(userDataLogin);
      localStorage.setItem("Fullname", data.data.FullName);
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("Username", data.data.Username);
      navigate("/chat");
    } catch (e) {}
  };

  return {
    acc,    
    pass,
    setAcc,
    setPass,
    handleSubmit,
  };
};

export default useLogin;
