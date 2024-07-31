import { useEffect, useState, useRef } from "react";
import FriendListContainer from "../../components/listFriends/friendListContainer";
import { useDispatch, useSelector } from "react-redux";
import MsgChat from "../../components/message/contentsChat/messageContainer";
import MsgSend from "../../components/message/textarea/textareContainer";
import userAction from "../../redux/actions/user/userActions";
import NoMessage from "../../components/message/contentsChat/noMessage";
import FriendStatus from "../../common/components/avatar/avatarFriend";
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
        <FriendListContainer onSelectFriend={handleSelectFriend} />
        <div style={{ flex: 1 }}>
          {selectedFriend ? (
            <div className="wrapper-one">
              <div className="wrapper-two">
                <FriendStatus friend={selectedFriend} />
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
