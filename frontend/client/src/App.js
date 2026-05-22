import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./componants/ProtectedRoute";
import Logout from "./auth/Logout"
import TutorRegister from "./pages/TutorRegister";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/tutor/register" element={<TutorRegister />} />

        <Route path="/profile" element={
          <ProtectedRoute>
            <h2>User Profile (Protected)</h2>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
