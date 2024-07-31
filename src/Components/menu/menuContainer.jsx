import React, { useEffect } from "react";
import { Menu } from "antd";
import MenuHeader from "./menuHeader";
import MenuList from "./menuList";
import icon1 from "../../assets/images/acong.png";
import icon3 from "../../assets/images/group.png";
import icon4 from "../../assets/images/night.png";
import icon5 from "../../assets/images/profile.png";
import "../../assets/styles/menuContainer.scss";
function IsMenu({ info }) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const menuItems = [
    {
      icon: icon1,
      text: "Nhắc đến bạn",
    },
    {
      icon: icon3,
      text: "Tạo nhóm",
    },
    {
      icon: icon4,
      text: "Giao diện tối",
    },
    {
      icon: icon5,
      text: "Đăng xuất",
      onClick: handleLogout,
    },
  ];

  return (
    <div className="menu-container">
      <Menu>
        <Menu.Item key="1">
          <MenuHeader info={info} />
        </Menu.Item>
        <MenuList menuItems={menuItems} />
      </Menu>
    </div>
  );
}

export default IsMenu;
