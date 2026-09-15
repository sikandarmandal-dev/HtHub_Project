import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TutorSearch from "./pages/TutorSearch";
import StudentDashboard from "./dashboards/StudentDashboard";
import TutorDashboard from "./dashboards/TutorDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

function DashboardRedirect() {
    const { user } = useAuth();
    return <Navigate to={user?.role === "tutor" ? "/tutordashboard" : "/studentdashboard"} replace />;
}

export default function App() {
    return <AuthProvider><BrowserRouter><Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tutors/find" element={<TutorSearch />} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardRedirect /></ProtectedRoute>} />
        <Route path="/studentdashboard" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/tutordashboard" element={<ProtectedRoute role="tutor"><TutorDashboard /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
    </Routes></BrowserRouter></AuthProvider>;
}
