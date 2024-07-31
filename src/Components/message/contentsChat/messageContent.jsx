import React from "react";
import "../../../assets/styles/messageContent.scss"
import MessageImages from "../contentFiles/messageImages";
import MessageFiles from "../contentFiles/messageFiles";

const MessageContent = ({ msg }) => {
  return (
    <>
      <MessageImages images={msg.Images} />
      <MessageFiles files={msg.Files} />
      <p className="message-content">{msg.Content}</p>
    </>
  );
};

export default MessageContent;
