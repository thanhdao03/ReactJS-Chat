import React from 'react';
import { Image } from 'antd';
import iconUser from '../../../assets/images/user_face.png'; // Đảm bảo đường dẫn đúng
import apiRoute from '../../helpers/api'; // Đảm bảo đường dẫn đúng

const UserAvatarMenu = ({ avatar, onClick }) => {
  return (
    <Image
      onClick={onClick}
      src={apiRoute.getAvatarUrl(avatar)}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
      }}
      preview={false}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = iconUser;
      }}
    />
  );
};

export default UserAvatarMenu;
