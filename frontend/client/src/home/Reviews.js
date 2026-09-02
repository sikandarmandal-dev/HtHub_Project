import React from 'react';
function Reviews() {
    return (
        <div>
            <section id="reviews" className="container py-5">
                <div className="text-center mb-5">
                    <p style={{ color: '#22d3ee', letterSpacing: '4px' }}>REVIEWS</p>
                    <h2 className="display-4 fw-bold">Students Are Loving It</h2>
                </div>

                <div className="row g-4">
                    {[
                        ['Aarav Sharma', 'The UI and learning experience feel absolutely premium.'],
                        ['Priya Singh', 'Mentorix made learning fun and personalized.'],
                        ['Rahul Verma', 'One of the best tutor platforms I have ever used.'],
                    ].map((item, i) => (
                        <div className="col-lg-4" key={i}>
                            <div
                                className="h-100 p-4"
                                style={{
                                    borderRadius: '30px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                }}
                            >
                                <div className="text-warning fs-4 mb-3">★★★★★</div>
                                <p className="text-secondary fs-5">“{item[1]}”</p>

                                <div className="d-flex align-items-center gap-3 mt-4">
                                    <div
                                        style={{
                                            width: '55px',
                                            height: '55px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg,#22d3ee,#6366f1)',
                                        }}
                                    ></div>

                                    <div>
                                        <h5 className="m-0 fw-bold">{item[0]}</h5>
                                        <small className="text-secondary">Student</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

export default Reviews;