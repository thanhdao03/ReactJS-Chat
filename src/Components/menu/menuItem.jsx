import React from "react";
import { Image } from "antd";

const MenuItemComponent = ({ item }) => {
  return (
    <div
      onClick={item.onClick}
      style={{ display: "flex", alignItems: "center" }}
    >
      <Image
        style={{
          width: "20px",
          height: "20px",
          margin: "10px",
        }}
        src={item.icon}
        preview={false}
      />
      <span>{item.text}</span>
    </div>
  );
};

export default MenuItemComponent;
