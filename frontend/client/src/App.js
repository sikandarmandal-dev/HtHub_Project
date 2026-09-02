import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./auth/ProtectedRoute";
import Logout from "./auth/Logout"
import TutorRegister from "./pages/TutorRegister";
import TutorSearch from "./pages/TutorSearch";
import TutorFilter from "./pages/TutorFilter";
import StudentDashboard from "./dashboards/StudentDashboard";
import TutorDashboard from "./dashboards/TutorDashboard";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/tutor/register" element={<TutorRegister />} />
        <Route path="/tutors/find" element={<TutorSearch />} />
        <Route path="/tutor/filter" element={<TutorFilter />} />
        <Route path="/tutordashboard" element={<TutorDashboard />} />
        <Route path="/studentdashboard" element={<StudentDashboard />} />

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
