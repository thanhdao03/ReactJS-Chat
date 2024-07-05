import { message } from "antd";
import axios from "axios";
// export const baseUrl = "http://localhost:8888/api";
export const baseUrl = "http://10.2.44.52:8888/api";
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("chua luu token");
  }
  return token;
};
export const apiRegister = async (userData) => {
  try {
    const res = await axios.post(`${baseUrl}/auth/register`, userData, {
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
    const res = await axios.post(`${baseUrl}/auth/login`, userDataLogin, {
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
    const res = await axios.get(`${baseUrl}/user/info`, { headers });
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};
export const updateUser = async (formData) => {
  try {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const res = await axios.post(`${baseUrl}/user/update`, formData, {
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
    const res = await axios.get(`${baseUrl}/message/list-friend`, {
      headers,
    });
    return res.data.data;
  } catch (e) {
    console.log(e);
  }
};
export const apiGetMessages = async (friendID, lastTime = null) => {
  try {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const url = lastTime
      ? `${baseUrl}/message/get-message?FriendID=${friendID}&LastTime=${lastTime}`
      : `${baseUrl}/message/get-message?FriendID=${friendID}`;
    const res = await axios.get(url, { headers });
    if (res.data.status === 1) {
      return res.data.data;
    } else {
      message.error(res.data.message || "Lỗi get tin nhắn");
      return null;
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const apiSendMessage = async (friendID, content, fileList) => {
  try {
    const token = getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("FriendID", friendID);
    formData.append("Content", content);

    if (fileList && fileList.length > 0) {
      fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });
    }

    const res = await axios.post(
      `${baseUrl}/message/send-message`,
      formData,
      {
        headers,
      }
    );
    if (res.data.status === 1) {
      return res.data.data;
    } else {
      message.error(res.data.message || "Lỗi send tin nhắn ");
    }
  } catch (e) {
    console.log(e);
    return null;
  }
};
