import React from "react";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadAvatar = ({ fileList, setFileList, setImageFile }) => {
  const handleImageChange = ({ file, fileList }) => {
    setFileList(fileList);
    setImageFile(file.originFileObj);
  };

  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      beforeUpload={() => false}
      onChange={handleImageChange}
    >
      {fileList.length > 0 ? (
        <img
          src={URL.createObjectURL(fileList[0].originFileObj)}
          alt="avatar"
          style={{ width: "100%" }}
        />
      ) : (
        <div>
          <UploadOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      )}
    </Upload>
  );
};

export default UploadAvatar;
