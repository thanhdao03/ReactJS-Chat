import React, { useState } from "react";
import { Form, Modal, message } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import userAction from "../../redux/actions/user/userActions";
import UpdateForm from "./updateForm";

const { updateUser } = userAction;

const ModalInfo = ({ isModal, setIsModal }) => {
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

  const handleCancel = () => {
    setIsModal(false);
  };

  return (
    <Modal
      title="Update User"
      onOk={handleUpdate}
      open={isModal}
      onCancel={handleCancel}
    >
      <UpdateForm
        form={form}
        fileList={fileList}
        setFileList={setFileList}
        setImageFile={setImageFile}
      />
    </Modal>
  );
};

export default ModalInfo;
