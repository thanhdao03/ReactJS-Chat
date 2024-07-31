import React from "react";
import { Image } from "antd";
import imgDropdwn from "../../../assets/images/luotxuong.png";
const ScrollButton = ({ scrollToBottom }) => {
  return (
    <Image
      preview={false}
      src={imgDropdwn}
      style={{
        position: "fixed",
        bottom: "80px",
        right: "10px",
        width: "45px",
        height: "45px",
        cursor: "pointer",
      }}
      onClick={scrollToBottom}
    />
  );
};

export default ScrollButton;
