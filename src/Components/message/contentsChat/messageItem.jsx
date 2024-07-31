import React from "react";
import MessageContent from "./messageContent";
import MessageAvatar from "../../../common/components/avatar/avatarMessage";
import MessageTimestamp from "../../../common/components/time/timeMessage";

const MessageItem = ({ msg, selectedFriend }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: msg.MessageType === 1 ? "row-reverse" : "row",
        alignItems: "center",
        marginBottom: "10px",
      }}
    >
      <MessageAvatar
        avatar={selectedFriend.Avatar}
        messageType={msg.MessageType}
      />

      <div
        style={{
          backgroundColor: msg.MessageType === 1 ? "#E0F0FF" : "#E9EAED",
          borderRadius: "10px",
          maxWidth: "400px",
        }}
      >
        <MessageContent msg={msg} />
        <MessageTimestamp
          createdAt={msg.CreatedAt}
          messageType={msg.MessageType}
          isSend={msg.isSend}
        />
      </div>
    </div>
  );
};

export default MessageItem;
