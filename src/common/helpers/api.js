import axios from "axios";
import iconUser from "../../assets/images/user_face.png";
import config from "../../config/config";
// export const baseUrl = process.env.REACT_APP_URL_API;

const api = axios.create({ baseURL: config.apiUrl });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const apiRoute = {
  login(userDataLogin) {
    return api.post("/auth/login", userDataLogin, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  register(userData) {
    return api.post("/auth/register", userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getInfo() {
    return api.get("/user/info", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  updateUser(formData) {
    return api.post("/user/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getListFriends() {
    return api.get("/message/list-friend", {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  sendMessage(friendID, content, fileList) {
    const formData = new FormData();
    formData.append("FriendID", friendID);
    formData.append("Content", content);
    if (fileList && fileList.length > 0) {
      fileList.forEach((file) => {
        formData.append("files", file.originFileObj);
      });
    }
    return api.post("/message/send-message", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  getMessages(friendID, lastTime = null) {
    const url = lastTime
      ? `${config.apiUrl}/message/get-message?FriendID=${friendID}&LastTime=${lastTime}`
      : `${config.apiUrl}/message/get-message?FriendID=${friendID}`;
    return api.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAvatarUrl(avatar) {
    return avatar ? `${config.apiUrl}/images/${avatar}` : iconUser;
  },
};
export default apiRoute;
