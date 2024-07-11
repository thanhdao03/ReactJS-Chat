import { useEffect, useState } from "react";
import { getInfo, updateUser } from "../../redux/actions/userActions";
import { Button, Form, Input, Upload, Modal, message, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import iconUser from "../../assets/Images/user_face.png";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAvatarUrl } from "../../Services/api";
function InfoUser() {
  const [userInfo, setUserInfo] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  useEffect(() => {
    if (user.userInfo) {
      setUserInfo(user.userInfo);
      form.setFieldsValue(user.userInfo);
    }
  }, [user.userInfo, form]);

  const showModal = () => {
    setIsModal(true);
    form.setFieldValue(userInfo);
  };
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
    <>
      <div
        style={{
          textAlign: "center",
        }}
      >
        {userInfo ? (
          <div>
            <h1>User Information</h1>
            <h2>Full Name: {userInfo.FullName}</h2>
            <h2>Username: {userInfo.Username}</h2>
            <h2>Image:</h2>
            <Image
              src={getAvatarUrl(userInfo.Avatar)}
              style={{
                width: "300px",
                height: "auto",
                margin: "10px 0px 40px 0",
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = iconUser;
              }}
            />
          </div>
        ) : (
          <p>Loading user info...</p>
        )}
        <Button type="primary" onClick={showModal}>
          Update User
        </Button>
        <div>
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
                rules={[
                  { required: true, message: "Fullname khong duoc de trong" },
                ]}
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
        </div>
      </div>
    </>
  );
}
export default InfoUser;
