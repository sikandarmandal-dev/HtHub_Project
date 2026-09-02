import React from "react";
import Header from "../componants/Header";
import Footer from "../componants/Footer";

function TutorDashboard() {
    return (
        <>
            <Header />
            <div className="d-flex">
                {/* Sidebar */}
                <div className="bg-light border-end vh-100 p-3" style={{ width: "250px" }}>
                    <h4 className="fw-bold text-success">Tutor Panel</h4>
                    <ul className="list-unstyled mt-3">
                        <li><a href="/dashboard/home" className="d-block py-2">🏠 Home</a></li>
                        {/* <li><a href="/dashboard/students" className="d-block py-2">👨‍🎓 My Students</a></li>
                        <li><a href="/dashboard/messages" className="d-block py-2">✉️ Messages</a></li>
                        <li><a href="/dashboard/profile" className="d-block py-2">👤 My Profile</a></li>
                        <li><a href="/dashboard/earnings" className="d-block py-2">💰 Earnings</a></li> */}
                        <li><a href="/logout" className="d-block py-2 text-danger">🚪 Logout</a></li>
                    </ul>
                </div>

                <div className="flex-grow-1 p-4">
                    <h2 className="fw-bold">Welcome Tutor 👩‍🏫</h2>
                    <p className="text-muted">Here you can manage your profiles and its just a confirmation that your profile has been created.</p>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default TutorDashboard;
