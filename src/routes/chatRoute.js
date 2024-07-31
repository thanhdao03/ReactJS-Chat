import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/loginPage/login";
import Register from "../pages/registerPage/register";
import Chat from "../pages/chatPage/chat";
import InfoUser from "../pages/infoPage/InfoUser";
import PrivateRoute from "./privateRoute";
import NotFound from "../pages/notFoundPage/notPage";

const ChatRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/chat" element={<PrivateRoute component={Chat} />} />
      <Route path="/info" element={<PrivateRoute component={InfoUser} />} />
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  );
};
export default ChatRoutes;
