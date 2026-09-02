import React from 'react';
function Subject() {
    return (
        <div>
            <section id="subjects" className="container py-5">
                <div className="text-center mb-5">
                    <p style={{ color: '#22d3ee', letterSpacing: '4px' }}>SUBJECTS</p>
                    <h2 className="display-4 fw-bold">Learn Anything You Want</h2>
                    <p className="text-secondary fs-5 mt-4 mx-auto" style={{ maxWidth: '700px' }}>
                        From school academics to coding and competitive exams — Mentorix helps students master every subject.
                    </p>
                </div>

                <div className="row g-4 subjectCards">
                    {[
                        ['📘', 'Mathematics'],
                        ['⚛️', 'Physics'],
                        ['🧪', 'Chemistry'],
                        ['🧬', 'Biology'],
                        ['💻', 'Coding'],
                        ['📝', 'English'],
                        ['📈', 'Commerce'],
                        ['🏆', 'Competitive Exams'],
                    ].map((item, i) => (
                        <div className="col-md-6 col-lg-3" key={i}>
                            <div
                                className="h-100 p-4 text-center"
                                style={{
                                    borderRadius: '28px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    backdropFilter: 'blur(20px)',
                                }}
                            >
                                <div style={{ fontSize: '55px' }}>{item[0]}</div>
                                <h3 className="fw-bold mt-4">{item[1]}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Subject;