import React, { useState } from "react";
import axios from "axios";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student"
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/auth/register", formData);
            alert(res.data.message);
        } catch (err) {
            alert("Error registering user");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Register</h2>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input name="name" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input name="email" type="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input name="password" type="password" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Role</label>
                    <select name="role" className="form-select" onChange={handleChange}>
                        <option value="student">Student</option>
                        <option value="tutor">Tutor</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    );
}

export default Register;
