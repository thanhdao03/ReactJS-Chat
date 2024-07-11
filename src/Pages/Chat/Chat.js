import { useEffect, useState, useRef } from "react";
import NoMessage from "../../Components/NoMessage/NoMessage";
import ListFriends from "../../Components/listFriends/ListFriends";
import { Form, Image, Input, Upload } from "antd";
import iconUser from "../../assets/Images/user_face.png";
import imgSend from "../../assets/Images/sendMSG.png";
import imgFile from "../../assets/Images/file.png";
import imgIcon from "../../assets/Images/icon.png";
import imgSent from "../../assets/Images/sent.png";
import imgSentt from "../../assets/Images/sentttttttttt.png";
import imgDropdwn from "../../assets/Images/luotxuong.png";
import fileDowload from "../../assets/Images/file-dl.png";
import EmojiPicker from "emoji-picker-react";
import { CloseOutlined } from "@ant-design/icons";
import { baseUrl } from "../../Services/api";
import { getAvatarUrl } from "../../Services/api";
import { getMessages, sendMessage } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
function Chat() {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");
  const messages = useSelector((state) => state.chat.messages);

  const dispatch = useDispatch();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSelectFriend = (friend) => {
    setSelectedFriend(friend);
    dispatch(getMessages(friend.FriendID));
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };
  const handleSendMessage = () => {
    if (!newMessage.trim() && fileList.length === 0) return;
    dispatch(sendMessage(selectedFriend.FriendID, newMessage, fileList));
    setNewMessage("");
    setFileList([]);
  };

  const handleRemoveImage = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

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

  const clickEmoji = (event, emojiObject) => {
    const emoji = emojiObject.emoji;
    setNewMessage((prev) => prev + emoji);
  };

  const handleUploadChange = ({ file, fileList }) => {
    setFileList(fileList);
    setImageFile(file.originFileObj);
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
                <p style={{ margin: "5px 0px 0px 0px", fontSize: "21px" }}>
                  {selectedFriend.FullName || "None"}
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
                      key={msg._id}
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
                            msg.MessageType === 1 ? "#E0F0FF" : "#E9EAED",
                          borderRadius: "10px",
                          maxWidth: "400px",
                        }}
                      >
                        {msg.Images &&
                          msg.Images.length > 0 &&
                          msg.Images.map((img) => {
                            const imgUrl = `${baseUrl}${img.urlImage}`;
                            return (
                              <Image
                                key={img._id}
                                src={imgUrl}
                                style={{
                                  maxWidth: "200px",
                                  borderRadius: "10px",
                                }}
                              />
                            );
                          })}
                        {msg.Files &&
                          msg.Files.length > 0 &&
                          msg.Files.map((file) => {
                            const fileUrl = `${baseUrl}/${file.urlFile}`;
                            return (
                              <a href={fileUrl}>
                                <Image
                                  src={fileDowload}
                                  preview={false}
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    margin: "0px 10px 0px 5px",
                                  }}
                                />
                                {file.FileName}
                              </a>
                            );
                          })}
                        <p
                          style={{
                            maxWidth: "400px",
                            wordWrap: "break-word",
                            margin: "10px 0px 5px 0px",
                            fontSize: "15px",
                            lineHeight: "17px",
                            padding: "0px 10px 0px 10px",
                          }}
                        >
                          {msg.Content}
                        </p>
                        <div
                          style={{
                            display: "flex",
                            padding: "0px 10px 0px 10px",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "12px",
                              color: "#999",
                              margin: "5px 0px 10px 0px",
                            }}
                          >
                            {new Date(msg.CreatedAt).toLocaleDateString(
                              "vi-VN",
                              {
                                day: "2-digit",
                                month: "2-digit",
                              }
                            )}{" "}
                            {new Date(msg.CreatedAt).toLocaleTimeString(
                              "vi-VN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                              }
                            )}
                          </p>

                          {msg.MessageType === 1 && (
                            <Image
                              preview={false}
                              src={msg.isSend === 0 ? imgSent : imgSentt}
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
                <Form.Item style={{ display: "none" }}>
                  <Upload
                    id="file-upload"
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={() => false}
                    onChange={handleUploadChange}
                    multiple
                  >
                    {fileList.length > 0 ? (
                      <img
                        src={URL.createObjectURL(fileList[0].originFileObj)}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      <div></div>
                    )}
                  </Upload>
                </Form.Item>
                <Image
                  preview={false}
                  src={imgFile}
                  style={{
                    width: "25px",
                    height: "25px",
                    margin: "8px 5px 0px 5px",
                  }}
                  onClick={() => document.getElementById("file-upload").click()}
                />
                <Input.TextArea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Nhập tin nhắn"
                  style={{
                    height: "40px",
                    position: "relative",
                    borderRadius: "50px",
                    padding: "5px",
                    overflow: "hidden",
                  }}
                  onKeyDown={handleKeyDown}
                />
                {fileList.length > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: "60px",
                      left: "10px",
                      display: "flex",
                      flexWrap: "wrap",
                    }}
                  >
                    {fileList.map((file) => (
                      <div
                        key={file.uid}
                        style={{ position: "relative", marginRight: "5px" }}
                      >
                        <img
                          src={URL.createObjectURL(file.originFileObj)}
                          alt="file preview"
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                          }}
                        />
                        <CloseOutlined
                          onClick={() => handleRemoveImage(file)}
                          style={{
                            position: "absolute",
                            top: "0px",
                            right: "0px",
                            cursor: "pointer",
                            color: "red",
                            backgroundColor: "white",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <Image
                  preview={false}
                  src={imgIcon}
                  style={{
                    width: "25px",
                    height: "25px",
                    position: "absolute",
                    right: "10px",
                    margin: "7px 0px 5px 0px",
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
export default Chat;
