import { message } from "antd";
import axios, { formToJSON } from "axios";
const baseUrl = "http://localhost:8888";
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("chua luu token");
  }
  return token;
};
export const apiRegister = async (userData) => {
  try {
    const res = await axios.post(`${baseUrl}/api/auth/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    message.success("success");
    return res.data;
  } catch (e) {
    if (e.message) {
      message.error(e.message);
    }
  }
};
export const apiLogn = async (userDataLogin) => {
  try {
    const res = await axios.post(`${baseUrl}/api/auth/login`, userDataLogin, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    message.success("success");
    return res.data;
  } catch (e) {
    if (e.message) {
      message.error(e.message);
    }
  }
};

export const apiGetInfo = async () => {
  try {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const res = await axios.get(`${baseUrl}/api/user/info`, { headers });
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};
export const updateUser = async (userData) => {
  try {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const formData = new FormData();
    for (const key in userData) {
      formData.append(key, userData[key]);
    }
    const res = await axios.post(`${baseUrl}/api/user/update`, formData, {
      headers,
    });
    return res.data;
  } catch (e) {
    console.log(e);
  }
};
export const apiGetListFriends = async () => {
  try {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    const res = await axios.get(`${baseUrl}/api/message/list-friend`, {
      headers,
    });
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};
