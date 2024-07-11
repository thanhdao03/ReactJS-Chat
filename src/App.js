import { Route, Routes } from "react-router-dom";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Chat from "./Pages/Chat/Chat";
import InfoUser from "./Components/infoUser/InfoUser";
import { BrowserRouter } from "react-router-dom";
import React from "react";
function App() {
  return (
    <div>
      <Routes>
        <React.StrictMode>
          <BrowserRouter>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/info" element={<InfoUser />} />
          </BrowserRouter>
        </React.StrictMode>
      </Routes>
    </div>
  );
}

export default App;
