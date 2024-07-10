import { Route, Routes } from "react-router-dom";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import Chat from "./Pages/Chat/Chat";
import InfoUser from "./Components/infoUser/InfoUser";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/info" element={<InfoUser />} />
      </Routes>
    </div>
  );
}

export default App;
