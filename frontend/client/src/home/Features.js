import React from 'react';
function Features() {
    return (
        <div>
            <section id="features" className="container py-5">
                <div className="text-center mb-5">
                    <p style={{ color: '#22d3ee', letterSpacing: '4px' }}>FEATURES</p>
                    <h2 className="display-4 fw-bold">Why Students Love Mentorix</h2>
                </div>

                <div className="row g-4">
                    {[
                        ['🤖', 'Smart Matching'],
                        ['🎥', 'Interactive Classes'],
                        ['📊', 'Analytics'],
                        ['✅', 'Verified Tutors'],
                        ['⏰', 'Flexible Schedule'],
                        ['💸', 'Affordable Pricing'],
                    ].map((item, i) => (
                        <div className="col-md-6 col-lg-4" key={i}>
                            <div
                                className="h-100 p-4"
                                style={{
                                    borderRadius: '30px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                }}
                            >
                                <div style={{ fontSize: '50px' }}>{item[0]}</div>
                                <h3 className="fw-bold mt-4">{item[1]}</h3>
                                <p className="text-secondary mt-3">
                                    Premium startup-style learning experience.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Features;