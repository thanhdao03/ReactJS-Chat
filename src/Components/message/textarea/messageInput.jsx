import React from "react";
import { Input } from "antd";
import "../../../assets/styles/messageInput.scss"
const MessageInput = ({ newMessage, setNewMessage, sendMsg }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
    }
  };

  return (
    <Input.TextArea
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
      placeholder="Nhập tin nhắn"
      className="message-input"
      style={{
        height: "40px",
        position: "relative",
        borderRadius: "50px",
        padding: "5px",
        overflow: "hidden",
      }}
      onKeyDown={handleKeyDown}
    />
  );
};

export default MessageInput;
