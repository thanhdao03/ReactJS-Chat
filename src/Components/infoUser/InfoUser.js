import { useEffect, useState } from "react";
import userAction from "../../redux/actions/user/userActions";
import { Button, Form, Image, Spin } from "antd";
import iconUser from "../../assets/images/user_face.png";
import { useDispatch, useSelector } from "react-redux";
import apiRoute from "../../service/api";
import { ModalInfo } from "../modal";
const { getInfo } = userAction;
function InfoUser() {
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.user);
  const [form] = Form.useForm();
  useEffect(() => {
    dispatch(getInfo());
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      form.setFieldsValue(userInfo);
    }
  }, [userInfo, form]);

  const showModal = () => {
    setIsModal(true);
    form.setFieldValue(userInfo);
  };

  return (
    <>
      {isModal ? <ModalInfo isModal={isModal} setIsModal={setIsModal} /> : null}
      <div
        style={{
          textAlign: "center",
        }}
      >
        {loading ? (
          <Spin />
        ) : error ? (
          <p>{error}</p>
        ) : userInfo ? (
          <div>
            <h1>User Information</h1>
            <h2>Full Name: {userInfo.FullName}</h2>
            <h2>Username: {userInfo.Username}</h2>
            <h2>Image:</h2>
            <Image
              src={apiRoute.getAvatarUrl(userInfo.Avatar)}
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
      </div>
    </>
  );
}
export default InfoUser;
