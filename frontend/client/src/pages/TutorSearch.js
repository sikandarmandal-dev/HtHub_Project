import React, { useState } from "react";
import axios from "axios";
import TutorFilter from "./TutorFilter";

function TutorList() {
    const [tutors, setTutors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // ✅ AI search function
    const searchWithAI = async (query, newPage = 1) => {
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:8080/api/tutors/search-ai", { query, page: newPage, limit: 6 });
            if (newPage === 1) {
                setTutors(res.data.tutors); // first search
            } else {
                setTutors([...tutors, ...res.data.tutors]); // load more
            }
            setTotalPages(res.data.totalPages);
            setPage(res.data.currentPage);
        } catch (err) {
            console.error("Error fetching tutors:", err);
        }
        setLoading(false);
    };

    return (
        <div className="container mt-4">
            {/* ✅ Manual Filters (optional) */}
            <TutorFilter onFilter={setTutors} />

            {/* ✅ Tutor Results */}
            <div className="row mt-4">
                {loading && <p className="text-center">Loading tutors...</p>}

                {tutors.length > 0 ? (
                    tutors.map((tutor) => (
                        <div className="col-md-4 mb-4" key={tutor._id}>
                            <div
                                className="card h-100 border-0 shadow-lg rounded-4"
                                style={{ transition: "transform 0.2s", cursor: "pointer" }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.03)"}
                                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                            >
                                <div className="card-body">
                                    <h5 className="card-title text-primary fw-bold mb-2">{tutor.name}</h5>
                                    <p className="card-text mb-3">
                                        <span className="badge bg-info text-dark me-2">📘 {tutor.subject}</span>
                                        <span className="badge bg-secondary">📍 {tutor.location}</span>
                                    </p>
                                    <p className="card-text fs-6">
                                        <strong>Fees:</strong>{" "}
                                        <span className="text-success fw-semibold">₹{tutor.fees} / hour</span>
                                    </p>
                                </div>

                                <div className="card-footer bg-light text-center border-0">
                                    <button className="btn btn-success w-100 fw-bold rounded-pill">
                                        ✉️ Contact Tutor
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    !loading && (
                        <p className="text-center text-danger fw-bold">
                            ❌ No tutors found. Try different keywords.
                        </p>
                    )
                )}
            </div>
            {!loading && page < totalPages && (
                <div className="text-center mt-3">
                    <button
                        className="btn btn-outline-primary fw-bold rounded-pill"
                        onClick={() => searchWithAI("", page + 1)} // next page load
                    >
                        🔽 Load More Tutors
                    </button>
                </div>
            )}
        </div>
    );
}

export default TutorList;
