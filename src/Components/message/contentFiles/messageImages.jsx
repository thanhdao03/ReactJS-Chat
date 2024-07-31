import React from "react";
import { Image } from "antd";
import config from "../../../config/config";
const MessageImages = ({ images }) => {
  return (
    <>
      {images && images.length > 0 && 
        images.map((img) => {
          const imgUrl = `${config.apiUrl}${img.urlImage}`;
          return (
            <Image
              key={img.id}
              src={imgUrl}
              style={{
                maxWidth: "200px",
                borderRadius: "10px",
              }}
            />
          );
        })}
    </>
  );
};

export default MessageImages;
