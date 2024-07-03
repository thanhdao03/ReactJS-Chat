import { useEffect, useState } from "react";
import { apiGetListFriends } from "../../Services/apiConfig";
import "./ListFriends.scss";
import SearchFriend from "../search/searchFriend";
function ListFriends() {
  const [listFriend, setListFriend] = useState([]);

  useEffect(() => {
    const fetchListFriends = async () => {
      try {
        const data = await apiGetListFriends();
        setListFriend(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchListFriends();
  }, []);
  return (
    <>
      <SearchFriend />
      {listFriend.length > 0 ? (
        <div>
          {listFriend.map((friend) => (
            <div className="class-friend" key={friend.FriendID}>
              <p className="fullname">{friend.FullName}</p>
              <p>{friend.Content || "none"}</p>
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
