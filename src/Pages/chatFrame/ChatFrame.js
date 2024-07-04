import { useEffect, useState, useRef } from "react";
import NoMessage from "../../Components/NoMessage/NoMessage";
import ListFriends from "../../Components/listFriends/ListFriends";
import iconUser from "../../assets/Images/user_face.png";
import { Button, Image, Input, Upload } from "antd";
import { apiGetMessages, apiSendMessage } from "../../Services/apiConfig";
import imgSend from "../../assets/Images/sendMSG.png";
import imgFile from "../../assets/Images/file.png";
import imgIcon from "../../assets/Images/icon.png";
import imgDropdwn from "../../assets/Images/luotxuong.png";
import EmojiPicker from "emoji-picker-react";
import { UploadOutlined } from "@ant-design/icons";
function ChatFrame() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [fileList, setFileList] = useState([]);
  const baseUrl = "http://localhost:8888";
  const handleSelectFriend = async (friend) => {
    setSelectedFriend(friend);
    const fetchMessages = await apiGetMessages(friend.FriendID);
    setMessages(fetchMessages);
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
  const getAvatarUrl = (avatar) => {
    return avatar ? `${baseUrl}/api/images/${avatar}` : iconUser;
  };
  const clickEmoji = (event, emojiObject) => {
    setNewMessage((prev) => prev + emojiObject.emoji);
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
                    width: "35px",
                    height: "35px",
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
              <div style={{ maxHeight: "90vh", overflow: "auto" }}>
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
                        />
                      )}
                      <div
                        style={{
                          backgroundColor:
                            msg.MessageType === 1 ? "#DCF8C6" : "#EED5D5",
                          padding: "10px",
                          borderRadius: "10px",
                          maxWidth: "60%",
                        }}
                      >
                        <p
                          style={{
                            maxWidth: "400px",
                            wordWrap: "break-word",
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
                        <p style={{ fontSize: "12px", color: "#999" }}>
                          {new Date(msg.CreatedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
        {dropdown && (
          <Image
            preview={false}
            src={imgDropdwn}
            style={{
              position: "fixed",
              right: 20,
              bottom: 20,
              cursor: "pointer",
              width: "40px",
              height: "40px",
            }}
          />
        )}
      </div>
    </>
  );
}
export default ChatFrame;
