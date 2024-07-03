import { Route, Routes } from "react-router-dom";
import Login from "./Pages/login/Login";
import Register from "./Pages/register/Register";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
