import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function StudentDashboard() {
    const { user, logout } = useAuth();
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    useEffect(() => { api.get("/bookings").then(({ data }) => setBookings(data)).catch(() => setBookings([])); }, []);
    return <div className="dashboard-shell"><aside className="sidebar"><Link className="brand" to="/">hometutor<span>.</span></Link><p className="sidebar-label">STUDENT SPACE</p><Link className="nav-item active" to="/studentdashboard">Overview</Link><Link className="nav-item" to="/tutors/find">Find a tutor</Link><button className="nav-item logout" onClick={() => { logout(); navigate("/"); }}>Sign out</button></aside>
        <main className="dashboard-main"><header className="dashboard-header"><div><p className="eyebrow">STUDENT DASHBOARD</p><h1>Good morning, {user?.name?.split(" ")[0]}.</h1><p className="muted">Keep your learning momentum going.</p></div><Link to="/tutors/find" className="button button-primary">Find a tutor</Link></header>
            <section className="stat-grid"><div className="stat-card"><span>Active requests</span><strong>{bookings.filter((b) => b.status === "pending").length}</strong></div><div className="stat-card"><span>Confirmed lessons</span><strong>{bookings.filter((b) => b.status === "accepted").length}</strong></div><div className="stat-card"><span>Total requests</span><strong>{bookings.length}</strong></div></section>
            <section className="panel"><div className="panel-heading"><div><h2>Recent requests</h2><p className="muted">Track your tutor conversations and lessons.</p></div><Link to="/tutors/find">Browse tutors →</Link></div>{bookings.length === 0 ? <div className="empty-state"><strong>No requests yet</strong><p>Find a tutor who matches your goals and send your first request.</p></div> : <div className="table-wrap"><table><thead><tr><th>Tutor</th><th>Subject</th><th>Date</th><th>Status</th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking._id}><td>{booking.tutor?.name}</td><td>{booking.subject}</td><td>{new Date(booking.preferredDate).toLocaleDateString()}</td><td><span className={`status ${booking.status}`}>{booking.status}</span></td></tr>)}</tbody></table></div>}</section>
        </main></div>;
}
