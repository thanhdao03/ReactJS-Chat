import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";
import Chat from "../pages/chat";
import InfoUser from "../components/infoUser/InfoUser";
import PrivateRoute from "../components/privateRoute.js/privateRoute";

const ChatRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/chat" element={<PrivateRoute component={Chat} />} />
      <Route path="/info" element={<PrivateRoute component={InfoUser} />} />
    </Routes>
  );
};
export default ChatRoutes;
