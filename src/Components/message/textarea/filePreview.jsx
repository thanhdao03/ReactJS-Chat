import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import "../../../assets/styles/filePreview.scss";
const FilePreview = ({ fileList, handleRemoveImage }) => {
  if (fileList.length === 0) return null;

  return (
    <div className="file-preview-container">
      {fileList.map((file) => (
        <div
          key={file.uid}
          style={{ position: "relative", marginRight: "5px" }}
        >
          <img
            src={URL.createObjectURL(file.originFileObj)}
            alt="file preview"
            className="file-preview-one"
          />
          <CloseOutlined
            onClick={() => handleRemoveImage(file)}
            className="close-outline"
          />
        </div>
      ))}
    </div>
  );
};

export default FilePreview;
