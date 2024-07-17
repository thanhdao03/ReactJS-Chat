import { useEffect, useState } from "react";
import SearchFriend from "../search/searchFriend";
import { Image, Spin } from "antd";
import iconUser from "../../assets/Images/user_face.png";
import { useDispatch, useSelector } from "react-redux";
import userAction from "../../redux/actions/userActions";
import apiRoute from "../../Services/api";
const { getListFriends } = userAction;
function ListFriends({ onSelectFriend }) {
  const { friends, loading, error } = useSelector((state) => state.friends);
  const [filteredFriends, setFilteredFriends] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListFriends());
  }, [dispatch]);
  useEffect(() => {
    if (friends.length > 0) {
      const sortedData = friends.sort((a, b) => {
        if (a.FullName < b.FullName) return -1;
        if (a.FullName > b.FullName) return 1;
        return 0;
      });
      setFilteredFriends(sortedData);
    }
  }, [friends]);
  return (
    <>
      <div style={{ maxHeight: "100vh", overflow: "hidden" }}>
        <SearchFriend
          listFriend={friends}
          setFilteredFriends={setFilteredFriends}
        />
        {loading ? (
          <Spin />
        ) : error ? (
          <p>{error}</p>
        ) : filteredFriends.length > 0 ? (
          <div
            className="list-friends"
            style={{ maxHeight: "95vh", overflowY: "auto", maxWidth: "400px" }}
          >
            {filteredFriends.map((friend) => (
              <div
                className="class-friend"
                style={{
                  display: "flex",
                  backgroundColor: "#FFFFFF",
                  margin: "2px 0px 0px 0px",
                }}
                key={friend.FriendID}
                onClick={() => onSelectFriend(friend)}
              >
                <div style={{ position: "relative", display: "flex" }}>
                  <Image
                    src={apiRoute.getAvatarUrl(friend.Avatar)}
                    style={{
                      width: "45px",
                      height: "45px",
                      margin: "18px 10px 0px 10px",
                      borderRadius: "50%",
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
                      margin: "20px 0px 0px 40px ",
                    }}
                  />
                </div>
                <div className="content-type">
                  <p
                    style={{
                      fontSize: "20px",
                      marginTop: "20px",
                      lineHeight: "22px",
                    }}
                    className="fullname"
                  >
                    {friend.FullName || "None"}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      marginTop: "-20px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      maxWidth: "140px",
                      lineHeight: "16px",
                    }}
                  >
                    {friend.Content || "none"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // <p>No user</p>
          <Spin />
        )}
      </div>
    </>
  );
}
export default ListFriends;
