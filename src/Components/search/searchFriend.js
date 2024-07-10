import { Image, Input, Menu } from "antd";
import menu from "../../assets/Images/menu.png";
import { useEffect, useState } from "react";
import { getInfo } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import iconUser from "../../assets/Images/user_face.png";
import icon1 from "../../assets/Images/acong.png";
import icon3 from "../../assets/Images/group.png";
import icon4 from "../../assets/Images/night.png";
import icon5 from "../../assets/Images/profile.png";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../Services/api";
function SearchFriend({ listFriend, setFilteredFriends }) {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const info = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getAvatarUrl = (avatar) => {
    return avatar ? `${baseUrl}/images/${avatar}` : iconUser;
  };
  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filtered = listFriend.filter((friend) =>
      (friend.FullName || "")
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    );
    setFilteredFriends(filtered);
  };
  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);
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
    <>
      <div
        style={{
          width: "400px",
          height: "40px",
          display: "flex",
          margin: "5px 0px 0px 0px",
        }}
      >
        <div>
          <Image
            style={{
              width: "20px",
              margin: "13px 5px 0px 5px",
            }}
            preview={false}
            onClick={() => {
              setShow(!show);
            }}
            src={menu}
          />
          {show && (
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
          )}
        </div>
        <Input
          style={{ padding: "10px", borderRadius: "50px" }}
          placeholder="Tìm kiếm bạn bè"
          onChange={handleSearch}
          value={search}
        />
      </div>
    </>
  );
}
export default SearchFriend;
