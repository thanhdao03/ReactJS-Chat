import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userAction from "../../redux/actions/user/userActions";
import FriendList from "./friendList";
import SearchFriend from "../search/searchFriend";
const { getListFriends } = userAction;

const FriendListContainer = ({ onSelectFriend }) => {
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
    <div style={{ maxHeight: "100vh", overflow: "hidden" }}>
      <SearchFriend
        listFriend={friends}
        setFilteredFriends={setFilteredFriends}
      />
      <FriendList
        filteredFriends={filteredFriends}
        loading={loading}
        error={error}
        onSelectFriend={onSelectFriend}
      />
    </div>
  );
};

export default FriendListContainer;
