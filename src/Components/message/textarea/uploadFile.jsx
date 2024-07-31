import React, { useRef } from "react";
import UploadButton from "../../../common/components/image/imageLoader";

const FileUpload = ({ fileList, setFileList }) => {
  const uploadRef = useRef();
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const triggerUpload = () => {
    uploadRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={uploadRef}
        style={{ display: "none" }}
        multiple
        onChange={(e) => {
          const files = Array.from(e.target.files);
          const newFileList = files.map((file, index) => ({
            uid: index.toString(),
            name: file.name,
            status: "done",
            url: URL.createObjectURL(file),
            originFileObj: file,
          }));
          handleUploadChange({ fileList: newFileList });
        }}
      />
      <UploadButton onClick={triggerUpload} />
    </div>
  );
};

export default FileUpload;
