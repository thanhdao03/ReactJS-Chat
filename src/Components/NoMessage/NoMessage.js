import { Image } from "antd";
import noMsg from "../../assets/Images/no-msh.png";
function NoMessage() {
  return (
    <>
      <div
        style={{
          display: "block",
          alignContent: "center",
          textAlign: "center",
          margin: "300px 0px 0px 0px",
        }}
      >
        <Image
          preview={false}
          style={{ width: "200px", height: "auto" }}
          src={noMsg}
        />
        <h1>Chưa có tin nhắn </h1>
      </div>
    </>
  );
}

export default NoMessage;
