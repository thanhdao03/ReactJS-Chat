import React from "react";
import { useNavigate } from "react-router-dom";
import UserAvatarMenu from "../../common/components/avatar/avatarMenu";

const MenuHeader = ({ info }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "40px",
      }}
    >
      <UserAvatarMenu
        avatar={info.Avatar}
        onClick={() => {
          navigate('/info');
        }}
      />
      <h2 style={{ margin: "0px" }}>{info.FullName}</h2>
    </div>
  );
};

export default MenuHeader;
