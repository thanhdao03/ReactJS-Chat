import React from "react";
import { Image } from "antd";
import imgSend from "../../../assets/images/sendMSG.png";
const SendButton = ({ sendMsg }) => {
  return (
    <Image
      preview={false}
      src={imgSend}
      style={{
        width: "40px",
        height: "40px",
        margin: "0px 5px 0px 5px",
      }}
      onClick={sendMsg}
    />
  );
};

export default SendButton;
