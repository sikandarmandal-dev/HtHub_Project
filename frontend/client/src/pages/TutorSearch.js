import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function TutorSearch() {
    const [filters, setFilters] = useState({ subject: "", location: "" });
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    async function search(event) {
        event?.preventDefault(); setLoading(true); setMessage("");
        try { const { data } = await api.get("/tutors", { params: filters }); setTutors(data.tutors); if (!data.tutors.length) setMessage("No tutors match those filters yet."); }
        catch { setMessage("We couldn't load tutors. Please try again."); } finally { setLoading(false); }
    }
    useEffect(() => { search(); }, []);
    async function requestLesson(tutor) {
        if (!isAuthenticated) return navigate("/login");
        const date = window.prompt("Preferred lesson date (YYYY-MM-DD):");
        if (!date) return;
        try { await api.post("/bookings", { tutorId: tutor._id, subject: tutor.subject, preferredDate: date }); window.alert("Request sent. The tutor will respond shortly."); }
        catch (error) { window.alert(error.response?.data?.message || "Could not send request."); }
    }
    return <main className="search-page"><nav className="search-nav"><Link className="brand dark" to="/">hometutor<span>.</span></Link><Link to={isAuthenticated ? "/dashboard" : "/login"}>{isAuthenticated ? "Dashboard" : "Sign in"} →</Link></nav><section className="search-hero"><p className="eyebrow">FIND YOUR MATCH</p><h1>Learn from someone<br /><em>who gets you.</em></h1><p className="muted">Search trusted tutors by subject and location, then request a lesson that fits your schedule.</p><form className="search-box" onSubmit={search}><input placeholder="Subject e.g. Mathematics" value={filters.subject} onChange={(e) => setFilters({ ...filters, subject: e.target.value })} /><input placeholder="Location e.g. Ranchi" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} /><button className="button button-primary">Search tutors</button></form></section><section className="results-section"><div className="results-heading"><h2>Available tutors</h2><span>{loading ? "Searching..." : `${tutors.length} results`}</span></div>{message && <div className="empty-state"><strong>{message}</strong></div>}<div className="tutor-grid">{tutors.map((tutor) => <article className="tutor-card" key={tutor._id}><div className="avatar">{tutor.name?.charAt(0)}</div><div className="tutor-card-main"><h3>{tutor.name}</h3><p className="tutor-meta">{tutor.subject} · {tutor.location}</p><p className="muted">{tutor.experience} experience · {tutor.timing}</p><div className="tutor-bottom"><strong>₹{tutor.fees || "—"} <small>/ hour</small></strong><button className="button button-small button-primary" onClick={() => requestLesson(tutor)}>Request lesson</button></div></div></article>)}</div></section></main>;
}
