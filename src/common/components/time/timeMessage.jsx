import React from "react";
import { Image } from "antd";
import moment from "moment"; 
import "moment/locale/vi"; 
import imgSent from "../../../assets/images/sent.png";
import imgSentt from "../../../assets/images/sentttttttttt.png";

const MessageTimestamp = ({ createdAt, messageType, isSend }) => {
  return (
    <div
      style={{
        display: "flex",
        padding: "0px 10px 0px 10px",
      }}
    >
      <p
        style={{
          fontSize: "12px",
          color: "#999",
          margin: "5px 0px 10px 0px",
        }}
      >
        {moment(createdAt).format("DD/MM/YYYY HH:mm")}
      </p>
      {messageType === 1 && (
        <Image
          preview={false}
          src={isSend === 0 ? imgSent : imgSentt}
          style={{
            width: "15px",
            margin: "0px 0px 0px 5px",
          }}
        />
      )}
    </div>
  );
};

export default MessageTimestamp;
