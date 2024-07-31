import React from "react";
import { Spin } from "antd";
import FriendItem from "./friendItem";
import "../../assets/styles/friendList.scss"
const FriendList = ({ filteredFriends, loading, error, onSelectFriend }) => {
  if (loading) return <Spin />;
  if (error) return <p>{error}</p>;
  if (filteredFriends.length > 0) {
    return (
      <div className="list-friends">
        {filteredFriends.map((friend) => (
          <FriendItem
            key={friend.FriendID}
            friend={friend}
            onSelectFriend={onSelectFriend}
          />
        ))}
      </div>
    );
  } else {
    return <p>No user</p>;
  }
};

export default FriendList;
