import React, { useState } from "react";
import axios from "axios";

function TutorFilter({ onFilter }) {
    const [keyword, setKeyword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // ✅ Call backend AI route
            const res = await axios.post("http://localhost:8080/api/tutors/search-ai", {
                query: keyword,
            });

            // AI returns structured filters
            const filters = res.data;
            onFilter(filters); // send to TutorList
        } catch (err) {
            console.error("AI parsing error:", err);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-light mt-4">
            <div className="row">
                <div className="col-10">
                    <input
                        type="text"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="form-control"
                        placeholder="Type anything... e.g. 'Math teacher in Ranchi under 500'"
                    />
                </div>
                <div className="col-2">
                    <button type="submit" className="btn btn-danger w-100">
                        Search
                    </button>
                </div>
            </div>
        </form>
    );
}

export default TutorFilter;
