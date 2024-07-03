import { useEffect, useState } from "react";
import { apiGetListFriends } from "../../Services/apiConfig";
import "./ListFriends.scss";
import SearchFriend from "../search/SearchFriend";
import { Image } from "antd";
import iconUser from "../../assets/Images/face-smile-regular.svg";
function ListFriends() {
  const [listFriend, setListFriend] = useState([]);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const baseUrl = "http://localhost:8888";
  useEffect(() => {
    const fetchListFriends = async () => {
      try {
        const data = await apiGetListFriends();
        const sortedData = data.sort((a, b) => {
          if (a.FullName < b.FullName) return -1;
          if (a.FullName > b.FullName) return 1;
          return 0;
        });
        setListFriend(sortedData);
        setFilteredFriends(sortedData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchListFriends();
  }, []);
  const getAvatarUrl = (avatar) => {
    return avatar ? `${baseUrl}/api/images/${avatar}` : iconUser;
  };
  return (
    <>
      <SearchFriend
        listFriend={listFriend}
        setFilteredFriends={setFilteredFriends}
      />
      {filteredFriends.length > 0 ? (
        <div>
          {filteredFriends.map((friend) => (
            <div
              style={{
                width: "400px",
                display: "flex",
                backgroundColor: "#FBF6E2",
                margin: "2px 0px 0px 0px",
              }}
              key={friend.FriendID}
            >
              <div>
                <Image
                  src={getAvatarUrl(friend.Avatar)}
                  style={{
                    width: "30px",
                    height: "auto",
                    margin: "23px 10px 0px 10px",
                  }}
                  preview={false}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = iconUser;
                  }}
                />
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: friend.isOnline ? "green" : "red",
                    position: "absolute",
                    margin: "-33px 4px 10px 33px",
                  }}
                />
              </div>
              <div className="content-type">
                <p
                  style={{ fontSize: "22px", marginTop: "10px" }}
                  className="fullname"
                >
                  {friend.FullName}
                </p>
                <p style={{ fontSize: "16px", marginTop: "-20px" }}>
                  {friend.Content || "none"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading list user</p>
      )}
    </>
  );
}
export default ListFriends;
