import React from "react";
import { Form, Input } from "antd";
import UploadAvatar from "./uploadAvatar";

const UpdateForm = ({ form, fileList, setFileList, setImageFile }) => {
  return (
    <Form form={form} layout="vertical">
      <Form.Item
        label="FullName"
        name="FullName"
        rules={[{ required: true, message: "Fullname không được để trống" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Avatar" name="Avatar">
        <UploadAvatar
          fileList={fileList}
          setFileList={setFileList}
          setImageFile={setImageFile}
        />
      </Form.Item>
    </Form>
  );
};

export default UpdateForm;
