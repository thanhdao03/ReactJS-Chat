import React from "react";
import { Image } from "antd";
import imgFile from "../../../assets/images/file.png";

const UploadButton = ({ onClick }) => {
  return (
    <Image
      preview={false}
      src={imgFile}
      style={{
        width: "25px",
        height: "25px",
        margin: "8px 5px 0px 5px",
        cursor: "pointer",
      }}
      onClick={onClick}
    />
  );
};

export default UploadButton;
