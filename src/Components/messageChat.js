import { useEffect, useState, useRef } from "react";
import { Image } from "antd";
import iconUser from "../assets/Images/user_face.png";
import imgSent from "../assets/Images/sent.png";
import imgSentt from "../assets/Images/sentttttttttt.png";
import imgDropdwn from "../assets/Images/luotxuong.png";
import fileDowload from "../assets/Images/file-dl.png";
import { baseUrl } from "../Services/api";
import apiRoute from "../Services/api";
function MsgChat({ messages, selectedFriend }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
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
  return (
    <>
      {" "}
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
                flexDirection: msg.MessageType === 1 ? "row-reverse" : "row",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              {msg.MessageType !== 1 && (
                <Image
                  src={apiRoute.getAvatarUrl(selectedFriend.Avatar)}
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
                        key={img.id}
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
                    {new Date(msg.CreatedAt).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                    })}{" "}
                    {new Date(msg.CreatedAt).toLocaleTimeString("vi-VN", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
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
    </>
  );
}
export default MsgChat;
