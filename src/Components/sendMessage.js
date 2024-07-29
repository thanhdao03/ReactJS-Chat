import { useState } from "react";
import { Form, Image, Input, Upload } from "antd";
import imgSend from "../assets/images/sendMSG.png";
import imgFile from "../assets/images/file.png";
import imgIcon from "../assets/images/icon.png";
import EmojiPicker from "emoji-picker-react";
import { CloseOutlined } from "@ant-design/icons";
function MsgSend({
  sendMsg,
  newMessage,
  setNewMessage,
  fileList,
  setFileList,
}) {
  const [showEmoji, setShowEmoji] = useState(false);
  const handleRemoveImage = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };
  const clickEmoji = (emojiObject) => {
    const emoji = emojiObject.emoji;
    setNewMessage((prev) => prev + emoji);
  };
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMsg();
    }
  };

  return (
    <>
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
          onClick={sendMsg}
        />
      </div>
    </>
  );
}
export default MsgSend;
