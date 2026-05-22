import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/auth/login", formData);
            alert("Login successful");

            localStorage.setItem("token", res.data.token);

            navigate("/");
        } catch (err) {
            alert("Login failed");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Login</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input name="email" type="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input name="password" type="password" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success w-100">Login</button>
            </form>
        </div>
    );
}

export default Login;



