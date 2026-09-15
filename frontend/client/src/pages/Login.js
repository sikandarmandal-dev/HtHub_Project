import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    async function submit(event) {
        event.preventDefault(); setError(""); setLoading(true);
        try {
            const { data } = await api.post("/auth/login", form);
            login(data.token, data.user);
            navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
        } catch (err) { setError(err.response?.data?.message || "Unable to sign in. Please try again."); }
        finally { setLoading(false); }
    }

    return <main className="auth-shell"><form className="auth-card" onSubmit={submit}>
        <span className="eyebrow">WELCOME BACK</span><h1>Sign in to HomeTutor</h1>
        <p className="muted">Continue managing your learning journey.</p>
        {error && <div className="alert">{error}</div>}
        <label>Email<input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
        <label>Password<input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
        <button className="button button-primary" disabled={loading}>{loading ? "Signing in..." : "Sign in"}</button>
        <p className="auth-footer">New to HomeTutor? <Link to="/register">Create an account</Link></p>
    </form></main>;
}
