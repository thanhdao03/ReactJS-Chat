// src/components/MessageAvatar.js
import React from "react";
import { Image } from "antd";
import iconUser from "../../../assets/images/user_face.png";
import apiRoute from "../../helpers/api";

const MessageAvatar = ({ avatar, messageType }) => {
  return (
    messageType !== 1 && (
      <Image
        src={apiRoute.getAvatarUrl(avatar)}
        style={{
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          margin: "0px 5px 0px 5px",
        }}
        preview={false}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = iconUser;
        }}
      />
    )
  );
};

export default MessageAvatar;
