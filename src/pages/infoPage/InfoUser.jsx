import { useEffect, useState } from "react";
import userAction from "../../redux/actions/user/userActions";
import { Form, Image, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ModalInfo from "../../components/modal/modalContainer";
import { ButtonShowModal } from "../../common/components/button/buttonShowModal";
import UserAvatar from "../../common/components/avatar/avatarUser";
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
            <UserAvatar avatar={userInfo.Avatar} />
          </div>
        ) : (
          <p>Loading user info...</p>
        )}
        <ButtonShowModal showModal={showModal} />
      </div>
    </>
  );
}
export default InfoUser;
