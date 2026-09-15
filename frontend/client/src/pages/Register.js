import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
    const [error, setError] = useState("");
    const [complete, setComplete] = useState(false);
    const navigate = useNavigate();
    async function submit(event) {
        event.preventDefault(); setError("");
        try { await api.post("/auth/register", form); setComplete(true); setTimeout(() => navigate("/login"), 1200); }
        catch (err) { setError(err.response?.data?.message || "Unable to create your account."); }
    }
    return <main className="auth-shell"><form className="auth-card" onSubmit={submit}>
        <span className="eyebrow">GET STARTED</span><h1>Create your account</h1><p className="muted">Find the right learning support in minutes.</p>
        {error && <div className="alert">{error}</div>}{complete && <div className="success">Account created. Redirecting to sign in...</div>}
        <label>Full name<input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
        <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
        <label>Password<input type="password" minLength="8" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
        <label>I am a<select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}><option value="student">Student / parent</option><option value="tutor">Tutor</option></select></label>
        <button className="button button-primary">Create account</button><p className="auth-footer">Already registered? <Link to="/login">Sign in</Link></p>
    </form></main>;
}
