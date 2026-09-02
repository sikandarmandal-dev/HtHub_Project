import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TutorRegister() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        subject: "",
        experience: "",
        location: "",
        timing: "",
        fees: "",
        availability: ""
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/tutor/register", formData);
            console.log("Response:", res.data);
            // alert("Tutor registered successfully!");
            navigate("/login");  // ✅ direct redirect
        } catch (err) {
            console.error("Register error:", err.response?.data || err.message);
            alert("Error registering tutor");
        }
    };


    return (
        <div className="container mt-5">
            <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Tutor Registration</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Subject</label>
                            <input
                                type="text"
                                name="subject"
                                className="form-control"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Experience (years)</label>
                            <input
                                type="number"
                                name="experience"
                                className="form-control"
                                value={formData.experience}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Location</label>
                            <input
                                type="text"
                                name="location"
                                className="form-control"
                                value={formData.location}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Timing</label>
                            <input
                                type="text"
                                name="timing"
                                className="form-control"
                                value={formData.timing}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Fees</label>
                            <input
                                type="text"
                                name="fees"
                                className="form-control"
                                value={formData.fees}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Availability</label>
                            <input
                                type="text"
                                name="availability"
                                className="form-control"
                                value={formData.availability}
                                onChange={handleChange}
                            />
                        </div>

                        <button type="submit" className="btn btn-success w-100">
                            Register Tutor
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TutorRegister;
