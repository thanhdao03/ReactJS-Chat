import { useEffect, useState } from "react";
import { apiGetInfo, updateUser } from "../../Services/apiConfig";
import { Button, Form, Input, Upload, Modal, message, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import iconUser from "../../assets/Images/user_face.png";
function InfoUser() {
  const [userInfo, setUserInfo] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await apiGetInfo();
        setUserInfo(data);
        form.setFieldValue(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchUser();
  }, [form]);
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
      const res = await updateUser(values);
      if (res.status === 1) {
        setUserInfo(res.data);
        message.success("Update success");
        const data = await apiGetInfo();
        setUserInfo(data);
      } else {
        message.error("Update failed");
      }
      setIsModal(false);
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

  const baseUrl = "http://localhost:8888";
  const getAvatarUrl = (avatar) => {
    const url = avatar ? `${baseUrl}/api/images/${avatar}` : iconUser;
    return url;
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
