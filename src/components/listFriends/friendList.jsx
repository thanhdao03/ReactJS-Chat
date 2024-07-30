import React from "react";
import { Spin } from "antd";
import FriendItem from "./friendItem";
const FriendList = ({ filteredFriends, loading, error, onSelectFriend }) => {
  if (loading) return <Spin />;
  if (error) return <p>{error}</p>;
  if (filteredFriends.length > 0) {
    return (
      <div
        className="list-friends"
        style={{ maxHeight: "95vh", overflowY: "auto", maxWidth: "400px" }}
      >
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
