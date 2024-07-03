import { Route, Routes } from "react-router-dom";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
import ChatFrame from "./Pages/chatFrame/ChatFrame";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/chat" element={<ChatFrame />} />
      </Routes>
    </div>
  );
}

export default App;
