import React from "react";
import { Image } from "antd";
import apiRoute from "../../service/api";
import iconUser from "../../assets/images/user_face.png";

const FriendItem = ({ friend, onSelectFriend }) => {
  return (
    <div
      className="class-friend"
      style={{
        display: "flex",
        backgroundColor: "#FFFFFF",
        margin: "2px 0px 0px 0px",
      }}
      key={friend.FriendID}
      onClick={() => onSelectFriend(friend)}
    >
      <div style={{ position: "relative", display: "flex" }}>
        <Image
          src={apiRoute.getAvatarUrl(friend.Avatar)}
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
            backgroundColor: friend.isOnline ? "green" : "red",
            position: "absolute",
            margin: "20px 0px 0px 40px ",
          }}
        />
      </div>
      <div className="content-type">
        <p
          style={{
            fontSize: "20px",
            marginTop: "20px",
            lineHeight: "22px",
          }}
          className="fullname"
        >
          {friend.FullName || "None"}
        </p>
        <p
          style={{
            fontSize: "14px",
            marginTop: "-20px",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "140px",
            lineHeight: "16px",
          }}
        >
          {friend.Content || "none"}
        </p>
      </div>
    </div>
  );
};

export default FriendItem;
