import React, { useEffect, useState } from "react";
import axios from "axios";
import TutorFilter from "./TutorFilter";

function TutorList() {
    const [tutors, setTutors] = useState([]);
    const [filters, setFilters] = useState({ location: "", subject: "", keyword: "" });

    useEffect(() => {
        const fetchTutors = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/tutors/find");
                setTutors(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchTutors();
    }, []);

    const filteredTutors = tutors.filter((tutor) => {
        const matchLocation = filters.location
            ? tutor.location?.toLowerCase() === filters.location.toLowerCase()
            : true;

        const matchSubject = filters.subject
            ? tutor.subject?.toLowerCase() === filters.subject.toLowerCase()
            : true;

        const matchKeyword = filters.keyword
            ? tutor.name?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            tutor.subject?.toLowerCase().includes(filters.keyword.toLowerCase()) ||
            tutor.location?.toLowerCase().includes(filters.keyword.toLowerCase())
            : true;

        return matchLocation && matchSubject && matchKeyword;
    });

    return (
        <div className="container mt-5">
            <TutorFilter onFilter={setFilters} />

            <div className="row mt-4">
                {filteredTutors.length > 0 ? (
                    filteredTutors.map((tutor) => (
                        <div className="col-md-4 mb-4" key={tutor._id}>
                            <div className="card shadow h-100">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">{tutor.name}</h5>
                                    <p className="card-text">
                                        <strong>Subject:</strong> {tutor.subject} <br />
                                        <strong>Location:</strong> {tutor.location} <br />
                                        <strong>Fees:</strong> ₹{tutor.fees} / hour
                                    </p>
                                </div>
                                <div className="card-footer text-center">
                                    <button className="btn btn-success btn-sm">Contact Tutor</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-muted">No tutors found</p>
                )}
            </div>
        </div>
    );
}

export default TutorList;

