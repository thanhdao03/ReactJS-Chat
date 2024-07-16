import { useDispatch, useSelector } from "react-redux";
import authAction from "../redux/actions/authAction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const { login } = authAction;
const useLogin = () => {
  const [acc, setAcc] = useState("daoptc");
  const [pass, setPass] = useState("123");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userDataLogin = {
      Username: acc,
      Password: pass,
    };
    dispatch(login(userDataLogin));
  };
  useEffect(() => {
    if (auth.user && !auth.error) {
      navigate("/chat");
    }
  }, [auth, navigate]);

  return {
    acc,
    pass,
    setAcc,
    setPass,
    handleSubmit,
    loading: auth.loading,
    error: auth.error,
  };
};

export default useLogin;
