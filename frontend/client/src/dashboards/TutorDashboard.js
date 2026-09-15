import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function TutorDashboard() {
    const { user, logout } = useAuth();
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
    useEffect(() => { api.get("/bookings").then(({ data }) => setBookings(data)).catch(() => setBookings([])); }, []);
    async function update(id, status) { await api.patch(`/bookings/${id}/status`, { status }); setBookings(bookings.map((b) => b._id === id ? { ...b, status } : b)); }
    return <div className="dashboard-shell"><aside className="sidebar"><Link className="brand" to="/">hometutor<span>.</span></Link><p className="sidebar-label">TUTOR SPACE</p><Link className="nav-item active" to="/tutordashboard">Overview</Link><button className="nav-item logout" onClick={() => { logout(); navigate("/"); }}>Sign out</button></aside>
        <main className="dashboard-main"><header className="dashboard-header"><div><p className="eyebrow">TUTOR DASHBOARD</p><h1>Welcome, {user?.name?.split(" ")[0]}.</h1><p className="muted">Manage your learners and upcoming sessions.</p></div><Link to="/" className="button button-secondary">View marketplace</Link></header>
            <section className="stat-grid"><div className="stat-card"><span>New requests</span><strong>{bookings.filter((b) => b.status === "pending").length}</strong></div><div className="stat-card"><span>Accepted lessons</span><strong>{bookings.filter((b) => b.status === "accepted").length}</strong></div><div className="stat-card"><span>Completed</span><strong>{bookings.filter((b) => b.status === "completed").length}</strong></div></section>
            <section className="panel"><div className="panel-heading"><div><h2>Student requests</h2><p className="muted">Respond promptly to build trust with learners.</p></div></div>{bookings.length === 0 ? <div className="empty-state"><strong>Your inbox is clear</strong><p>New student requests will appear here.</p></div> : <div className="table-wrap"><table><thead><tr><th>Student</th><th>Subject</th><th>Preferred date</th><th>Action</th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking._id}><td>{booking.student?.name}</td><td>{booking.subject}</td><td>{new Date(booking.preferredDate).toLocaleDateString()}</td><td>{booking.status === "pending" ? <span className="actions"><button className="button button-small button-primary" onClick={() => update(booking._id, "accepted")}>Accept</button><button className="button button-small button-ghost" onClick={() => update(booking._id, "declined")}>Decline</button></span> : <span className={`status ${booking.status}`}>{booking.status}</span>}</td></tr>)}</tbody></table></div>}</section>
        </main></div>;
}
