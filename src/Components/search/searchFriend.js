import { Image, Input, Dropdown, Space } from "antd";
import menu from "../../assets/Images/menu.png";
import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
function SearchFriend() {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const items = [
    {
      label: <a href="https://www.antgroup.com">1st menu item</a>,
      key: "0",
    },
    {
      label: <a href="https://www.aliyun.com">2nd menu item</a>,
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item",
      key: "3",
    },
  ];
  return (
    <>
      <div
        style={{
          width: "400px",
          height: "40px",
          display: "flex",
          margin: "10px 10x 10px 0px",
        }}
      >
        <div>
          <Image
            style={{ width: "20px", margin: "10px 10px 10px 10px" }}
            preview={false}
            onClick={() => {
              setShow(!show);
            }}
            src={menu}
          />
          {show && <>222</>}
        </div>
        <Input
          placeholder="Tìm kiếm bạn bè"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          value={search}
        />
      </div>
    </>
  );
}
export default SearchFriend;
