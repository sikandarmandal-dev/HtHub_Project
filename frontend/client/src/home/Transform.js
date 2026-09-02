import React from 'react';
function Transform() {
    return (
        <div>
            <section className="container py-5" id="Transform">
                <div
                    className="text-center"
                    style={{
                        borderRadius: '40px',
                        padding: '80px 30px',
                        background:
                            'linear-gradient(135deg,rgba(34,211,238,0.18),rgba(99,102,241,0.18))',
                        border: '1px solid rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    <h2 className="display-3 fw-bold">
                        Ready To Transform
                        <span
                            style={{
                                display: 'block',
                                background: 'linear-gradient(90deg,#22d3ee,#818cf8)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Your Learning Journey?
                        </span>
                    </h2>

                    <p className="text-secondary fs-5 mt-4 mx-auto" style={{ maxWidth: '800px' }}>
                        Join thousands of students already learning smarter with Mentorix.
                    </p>

                    <div className="d-flex justify-content-center gap-4 flex-wrap mt-5">
                        <button
                            className="btn btn-light text-dark fw-bold px-5 py-3"
                            style={{ borderRadius: '20px' }}
                        >
                            Start Learning
                        </button>

                        <button
                            className="btn btn-outline-light px-5 py-3"
                            style={{ borderRadius: '20px' }}
                        >
                            Explore Tutors
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Transform;