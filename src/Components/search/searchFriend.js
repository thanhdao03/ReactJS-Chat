import { Image, Input, Spin } from "antd";
import menu from "../../assets/Images/menu.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInfo } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import IsMenu from "../menu";
function SearchFriend({ listFriend, setFilteredFriends }) {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const { userInfo: info, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);
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
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);
  
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
          {loading ? (
            <Spin />
          ) : error ? (
            <p>Error{error}</p>
          ) : (
            show && <IsMenu info={info}/>
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
