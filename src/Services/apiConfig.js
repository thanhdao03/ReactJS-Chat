import axios from "axios";
const baseUrl = "http://localhost:8888";
export const apiRegister = async (userData) => {
  try {
    const res = await axios.post(`${baseUrl}/api/auth/register`, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (e) {
    console.log("loi" + e);
  }
};
export const apiLogn = async (userDataLogin) => {
  try {
    const res = await axios.post(
      `${baseUrl}/api/auth/login`,
      userDataLogin,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (e) {
    console.log("loi" + e);
  }
};
