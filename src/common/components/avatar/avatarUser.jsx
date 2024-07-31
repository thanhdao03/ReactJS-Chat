import React from 'react';
import { Image } from 'antd';
import iconUser from '../../../assets/images/user_face.png';
import apiRoute from '../../helpers/api';

const UserAvatar = ({ avatar }) => {
  return (
    <div>
      <h2>Image:</h2>
      <Image
        src={apiRoute.getAvatarUrl(avatar)}
        style={{
          width: '300px',
          height: 'auto',
          margin: '10px 0px 40px 0',
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = iconUser;
        }}
      />
    </div>
  );
};

export default UserAvatar;
