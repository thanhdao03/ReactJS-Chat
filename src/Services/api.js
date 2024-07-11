import iconUser from "../assets/Images/user_face.png";
export const baseUrl = "http://localhost:8888/api";
// export const baseUrl = "http://10.2.44.52:8888/api";

export const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.log("chua luu token");
  }
  return token;
};

export const getAvatarUrl = (avatar) => {
  return avatar ? `${baseUrl}/images/${avatar}` : iconUser;
};
