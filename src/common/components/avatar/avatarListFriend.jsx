import React from "react";
import { Image } from "antd";
import apiRoute from "../../helpers/api";
import iconUser from "../../../assets/images/user_face.png";

const AvatarListFriend = ({ avatarUrl, isOnline }) => {
  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Image
        src={apiRoute.getAvatarUrl(avatarUrl)}
        style={{
          width: "45px",
          height: "45px",
          margin: "18px 10px 0px 10px",
          borderRadius: "50%",
        }}
        preview={false}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = iconUser;
        }}
      />
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: isOnline ? "green" : "red",
          position: "absolute",
          margin: "20px 0px 0px 40px ",
        }}
      />
    </div>
  );
};

export default AvatarListFriend;
