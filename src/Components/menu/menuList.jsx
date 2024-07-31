import React from "react";
import { Menu } from "antd";
import MenuItemComponent from "./menuItem";

const MenuList = ({ menuItems }) => {
  return (
    <Menu>
      {menuItems.map((item, index) => (
        <Menu.Item key={index + 2}>
          <MenuItemComponent item={item} />
        </Menu.Item>
      ))}
    </Menu>
  );
};

export default MenuList;
