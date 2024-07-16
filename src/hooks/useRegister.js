import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateRegister } from "../utils/Validates";
import { useDispatch, useSelector } from "react-redux";
import authAction from "../redux/actions/authAction";
const useRegister = () => {
  const [fullname, setFullname] = useState("");
  const [acc, setAcc] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { register } = authAction;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
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
    dispatch(register(userData));
  };

  useEffect(() => {
    if (auth.user && !auth.error) {
      navigate("/chat");
    }
  }, [auth, navigate]);
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
