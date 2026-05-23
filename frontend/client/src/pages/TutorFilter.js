import React from 'react';
import { useState } from 'react';

function TutorFilter({ onFilter }) {
    const [location, setLocation] = useState("");
    const [subject, setSubject] = useState("");
    const [keyword, setKeyword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onFilter({ location, subject, keyword })
    }

    return (
        <div className='container mt-5'>
            <h2 className='text-center'>Search Tutors Near You</h2>
            <form onSubmit={handleSubmit}
                className="p-4 border rounded shadow bg-light mt-4 text-center m-2 p-2">
                <div className='row'>
                    <div className='col-3'>
                        <select placeholder='Enter Location'
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="form-select">
                            <option value={""}>Select Location</option>
                            <option value={"Deoghar"}>Deoghar</option>
                            <option value={"Godda"}>Godda</option>
                            <option value={"Ranchi"}>Ranchi</option>
                            <option value={"Madhupur"}>Madhupur</option>
                            <option value={"Jamtara"}>Jamtara</option>
                        </select>
                    </div>
                    <div className='col-3'>
                        <select placeholder='Enter subject'
                            className="form-select"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}>
                            <option value={""}>Select Subjects</option>
                            <option value={"Math"}>Math</option>
                            <option value={"Physics"}>Physics</option>
                            <option value={"Chemistry"}>Chemistry</option>
                            <option value={"Biology"}>Biology</option>
                            <option value={"Computer"}>Computer</option>
                        </select>
                    </div>
                    <div className='col-4'>
                        <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} className="form-select" placeholder='Enter Keywords' />
                    </div>
                    <div className='col-2'>
                        <button type="submit" className="btn btn-danger w-100">
                            Search Tutors
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default TutorFilter;


