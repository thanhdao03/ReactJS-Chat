import { useEffect, useState, useRef } from "react";
import NoMessage from "../../Components/NoMessage/NoMessage";
import ListFriends from "../../Components/listFriends/ListFriends";
import { Image } from "antd";
import iconUser from "../../assets/Images/user_face.png";
import apiRoute from "../../Services/api";
import { useDispatch, useSelector } from "react-redux";
import MsgChat from "../../Components/messageChat";
import MsgSend from "../../Components/sendMessage";
import userAction from "../../redux/actions/userActions";
const { getMessages, sendMessage } = userAction;
function Chat() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [hasMsg, setHasMsg] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  useEffect(() => {
    setHasMsg(messages.length > 0);
  }, [messages]);
  const handleSendMessage = () => {
    if (!newMessage.trim() && fileList.length === 0) return;
    dispatch(sendMessage(selectedFriend.FriendID, newMessage, fileList));
    setNewMessage("");
    setFileList([]);
  };
  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    dispatch(getMessages(friend.FriendID));
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <ListFriends onSelectFriend={handleSelectFriend} />
        <div style={{ flex: 1 }}>
          {selectedFriend ? (
            <div style={{ maxHeight: "100vh", overflow: "hidden" }}>
              <div style={{ display: "flex", position: "relative" }}>
                <Image
                  src={apiRoute.getAvatarUrl(selectedFriend.Avatar)}
                  style={{
                    width: "40px",
                    height: "40px",
                    margin: "3px 10px 0px 3px",
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
                    backgroundColor: selectedFriend.isOnline ? "green" : "red",
                    position: "absolute",
                    margin: "3px 0px 0px 26px ",
                  }}
                />
                <p style={{ margin: "5px 0px 0px 0px", fontSize: "21px" }}>
                  {selectedFriend.FullName || "None"}
                </p>
              </div>
              {hasMsg ? (
                <>
                  {" "}
                  <MsgChat
                    messages={messages}
                    selectedFriend={selectedFriend}
                  />
                </>
              ) : (
                <NoMessage />
              )}{" "}
              <MsgSend
                sendMsg={handleSendMessage}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                fileList={fileList}
                setFileList={setFileList}
              />
            </div>
          ) : (
            <NoMessage />
          )}
        </div>
      </div>
    </>
  );
}
export default Chat;
