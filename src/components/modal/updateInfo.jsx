import { useState } from "react";
import { Form, Input, Upload, Modal, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import userAction from "../../redux/actions/user/userActions";
const { updateUser } = userAction;
export const ModalInfo = ({ isModal, setIsModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const handleUpdate = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("FullName", values.FullName);
      if (fileList.length > 0) {
        formData.append("avatar", fileList[0].originFileObj);
      }
      if (imageFile) {
        formData.append("avatar", imageFile);
      }
      dispatch(updateUser(formData));
      setIsModal(false);
      navigate("/chat");
    } catch (e) {
      console.log(e);
      message.error("Update failed");
    }
  };
  const handleCacel = () => {
    setIsModal(false);
  };
  const handleImageChange = ({ file, fileList }) => {
    setFileList(fileList);
    setImageFile(file.originFileObj);
  };
  return (
    <Modal
      title="Update User"
      onOk={handleUpdate}
      open={isModal}
      onCancel={handleCacel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="FullName"
          name="FullName"
          rules={[{ required: true, message: "Fullname khong duoc de trong" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Avatar" name="Avatar">
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
        </Form.Item>
      </Form>
    </Modal>
  );
};
