import React from "react";
import { Image } from "antd";
import fileDowload from "../../../assets/images/file-dl.png";
import config from "../../../config/config";
const MessageFiles = ({ files }) => {
  return (
    <>
      {files && files.length > 0 &&
        files.map((file) => {
          const fileUrl = `${config.apiUrl}/${file.urlFile}`;
          return (
            <a href={fileUrl} key={file.id}>
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
    </>
  );
};

export default MessageFiles;
