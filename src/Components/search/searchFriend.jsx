import { Image, Spin } from "antd";
import menu from "../../assets/images/menu.png";
import { useEffect, useState } from "react";
import userAction from "../../redux/actions/user/userActions";
import { useDispatch, useSelector } from "react-redux";
import IsMenu from "../menu/menuContainer";
import SearchInput from "../../common/components/input/searchInput";
import "./serchFriend.scss";

const { getInfo } = userAction;

function SearchFriend({ listFriend, setFilteredFriends }) {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const { userInfo: info, loading, error } = useSelector((state) => state.user);
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
  return (
    <>
      <div className="search-container">
        <div>
          <Image
            className="image-search"
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
            <p>{error}</p>
          ) : (
            show && <IsMenu info={info} />
          )}
        </div>
        <SearchInput handleSearch={handleSearch} search={search} />
      </div>
    </>
  );
}
export default SearchFriend;
