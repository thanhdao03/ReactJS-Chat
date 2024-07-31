import React from "react";
import { Image } from "antd";
import iconUser from "../../../assets/images/user_face.png";
import apiRoute from "../../helpers/api";

const FriendStatus = ({ friend }) => {
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <Image
        src={apiRoute.getAvatarUrl(friend.Avatar)}
        style={{
          width: "40px",
          height: "40px",
          margin: "3px 10px 0px 3px",
          borderRadius: "50%",
        }}
        preview={false}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = iconUser;  
        }}
      />
      <div
        className="styles-fullname"
        style={{
          width: "10px",
          height: "10px",
          borderRadius: "50%",
          backgroundColor: friend.isOnline ? "green" : "red",
          position: "absolute",
          margin: "3px 0px 0px 26px",
        }}
      />
      <p style={{ margin: "5px 0px 0px 0px", fontSize: "21px" }}>
        {friend.FullName || "None"}
      </p>
    </div>
  );
};

export default FriendStatus;
