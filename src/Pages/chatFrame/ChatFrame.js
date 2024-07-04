import { useEffect, useState, useRef } from "react";
import NoMessage from "../../Components/NoMessage/NoMessage";
import ListFriends from "../../Components/listFriends/ListFriends";
import iconUser from "../../assets/Images/user_face.png";
import { Button, Image, Input, Upload } from "antd";
import { apiGetMessages, apiSendMessage } from "../../Services/apiConfig";
import imgSend from "../../assets/Images/sendMSG.png";
import imgFile from "../../assets/Images/file.png";
import imgIcon from "../../assets/Images/icon.png";
import imgSent from "../../assets/Images/sent.png";
import imgDropdwn from "../../assets/Images/luotxuong.png";
import EmojiPicker from "emoji-picker-react";
import { UploadOutlined } from "@ant-design/icons";
function ChatFrame() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [fileList, setFileList] = useState([]);
  const baseUrl = "http://localhost:8888";
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const handleSelectFriend = async (friend) => {
    setSelectedFriend(friend);
    const fetchMessages = await apiGetMessages(friend.FriendID);
    console.log(fetchMessages);
    if (fetchMessages === 0) {
      setMessages();
    } else {
      setMessages(fetchMessages);
      if (messagesContainerRef.current) {
        messagesContainerRef.current.scrollTop =
          messagesContainerRef.current.scrollHeight;
      }
    }
  };
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    const sentMessage = await apiSendMessage(
      selectedFriend.FriendID,
      newMessage,
      fileList
    );
    if (sentMessage) {
      setMessages([...messages, sentMessage]);
      setNewMessage("");
      setFileList([]);
    }
  };
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  const handleScroll = () => {
    if (
      messagesContainerRef.current.scrollTop <
      messagesContainerRef.current.scrollHeight -
        messagesContainerRef.current.clientHeight -
        100
    ) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
    setIsScrolled(false);
  };

  const getAvatarUrl = (avatar) => {
    return avatar ? `${baseUrl}/api/images/${avatar}` : iconUser;
  };
  const clickEmoji = (event, emojiObject) => {
    const emoji = emojiObject.emoji;
    setNewMessage((prev) => prev + emoji);
  };
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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
                  src={getAvatarUrl(selectedFriend.Avatar)}
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
                <p style={{ margin: "3px 0px 0px 0px", fontSize: "21px" }}>
                  {selectedFriend.FullName}
                </p>
              </div>
              <div
                ref={messagesContainerRef}
                onScroll={handleScroll}
                style={{ maxHeight: "88vh", overflow: "auto" }}
              >
                <div>
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        display: "flex",
                        flexDirection:
                          msg.MessageType === 1 ? "row-reverse" : "row",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      {msg.MessageType !== 1 && (
                        <Image
                          src={getAvatarUrl(selectedFriend.Avatar)}
                          style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            margin: "0px 5px 0px 5px",
                          }}
                          preview={false}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = iconUser;
                          }}
                        />
                      )}
                      <div
                        style={{
                          backgroundColor:
                            msg.MessageType === 1 ? "#DCF8C6" : "#EED5D5",
                          borderRadius: "10px",
                          maxWidth: "60%",
                          padding: "0px 10px 0px 10px",
                        }}
                      >
                        <p
                          style={{
                            maxWidth: "400px",
                            wordWrap: "break-word",
                            margin: "10px 0px 5px 0px",
                          }}
                        >
                          {msg.Content}
                        </p>
                        {msg.Images.length > 0 &&
                          msg.Images.map((img) => (
                            <Image
                              key={img._id}
                              src={`${baseUrl}${img.urlImage}`}
                              style={{ maxWidth: "200px" }}
                            />
                          ))}
                        <div style={{ display: "flex" }}>
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#999",
                              margin: "5px 0px 10px 0px",
                            }}
                          >
                            {new Date(msg.CreatedAt).toLocaleString()}
                          </p>
                          {msg.MessageType === 1 && (
                            <Image
                              preview={false}
                              src={msg.isSend === 0 ? imgSent : imgSent}
                              style={{
                                width: "15px",
                                margin: "0px 0px 0px 5px",
                              }}
                            ></Image>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              {isScrolled && (
                <Image
                  preview={false}
                  src={imgDropdwn}
                  style={{
                    position: "fixed",
                    bottom: "80px",
                    right: "10px",
                    width: "45px",
                    height: "45px",
                    cursor: "pointer",
                  }}
                  onClick={scrollToBottom}
                />
              )}
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  bottom: "5px",
                  right: "5px",
                  left: "400px",
                }}
              >
                <Image
                  preview={false}
                  src={imgFile}
                  style={{
                    width: "30px",
                    height: "30px",
                    margin: "5px",
                  }}
                  onClick={() => document.getElementById("file-upload").click()}
                />
                <Upload
                  id="file-upload"
                  fileList={fileList}
                  onChange={handleUploadChange}
                  beforeUpload={() => false}
                  multiple
                  showUploadList={false}
                  style={{ display: "none" }}
                >
                  <Button
                    icon={<UploadOutlined />}
                    style={{ display: "none" }}
                  />
                </Upload>
                <Input.TextArea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Nhập tin nhắn"
                  style={{ height: "40px" }}
                  onKeyDown={handleKeyDown}
                />
                <Image
                  preview={false}
                  src={imgIcon}
                  style={{
                    width: "30px",
                    height: "30px",
                    position: "absolute",
                    right: "10px",
                    margin: "5px 0px 5px 0px",
                  }}
                  onClick={() => {
                    setShowEmoji(!showEmoji);
                  }}
                />
                {showEmoji && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "45px",
                      right: "45px",
                      zIndex: 1,
                    }}
                  >
                    <EmojiPicker onEmojiClick={clickEmoji} />
                  </div>
                )}
                <Image
                  preview={false}
                  src={imgSend}
                  style={{
                    width: "40px",
                    height: "40px",
                    margin: "0px 5px 0px 5px",
                  }}
                  onClick={handleSendMessage}
                />
              </div>
            </div>
          ) : (
            <NoMessage />
          )}
        </div>
      </div>
    </>
  );
}
export default ChatFrame;
