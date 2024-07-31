import React from "react";
import AvatarListFriend from "../../common/components/avatar/avatarListFriend";
import "../../assets/styles/friendItem.scss";
const FriendItem = ({ friend, onSelectFriend }) => {
  return (
    <div
      className="class-friend"
      key={friend.FriendID}
      onClick={() => onSelectFriend(friend)}
    >
      <AvatarListFriend avatarUrl={friend.Avatar} isOnline={friend.isOnline} />
      <div className="content-type">
        <p className="fullname">{friend.FullName || "None"}</p>
        <p className="content-friend">{friend.Content || "none"}</p>
      </div>
    </div>
  );
};

export default FriendItem;
