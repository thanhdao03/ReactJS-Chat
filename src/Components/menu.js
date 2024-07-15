import { getAvatarUrl } from "../Services/api";
import { Image, Menu } from "antd";
import { useEffect } from "react";
import iconUser from "../assets/Images/user_face.png";
import icon1 from "../assets/Images/acong.png";
import icon3 from "../assets/Images/group.png";
import icon4 from "../assets/Images/night.png";
import icon5 from "../assets/Images/profile.png";
import { useNavigate } from "react-router-dom";
function IsMenu({info}) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
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
    <div
      style={{
        position: "absolute",
        backgroundColor: "white",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        zIndex: 1,
        margin: "10px 0px 0px 10px",
        width: "250px",
      }}
    >
      <Menu>
        <Menu.Item key="1">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "40px",
            }}
          >
            <Image
              onClick={() => {
                navigate("/info");
              }}
              src={getAvatarUrl(info.Avatar)}
              style={{
                width: "40px",
                height: "40px",
                margin: "10px 10px 10px 0px",
                borderRadius: "50%",
              }}
              preview={false}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = iconUser;
              }}
            />
            <h2 style={{ margin: "0px" }}>{info.FullName}</h2>
          </div>
        </Menu.Item>
        {menuItems.map((item, index) => (
          <Menu.Item key={index + 2}>
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
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}
export default IsMenu;
