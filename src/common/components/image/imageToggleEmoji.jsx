import React from "react";
import { Image } from "antd";
import imgIcon from "../../../assets/images/icon.png";
const EmojiToggleButton = ({ onClick }) => {
  return (
    <Image
      preview={false}
      src={imgIcon}
      style={{
        width: "25px",
        height: "25px",
        position: "absolute",
        right: "10px",
        margin: "7px 0px 5px 0px",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
};

export default EmojiToggleButton;
