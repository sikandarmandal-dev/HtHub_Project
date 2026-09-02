import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
function Hero() {
    const navigate = useNavigate();
    return (
        <div>
            <section className="container py-5" style={{ paddingTop: '120px' }}>
                <div className="row align-items-center g-5">
                    <div className="col-lg-6">
                        <div
                            className="d-inline-flex align-items-center gap-2 px-4 py-2 mb-4"
                            style={{
                                borderRadius: '999px',
                                background: 'rgba(34,211,238,0.12)',
                                border: '1px solid rgba(34,211,238,0.2)',
                                color: '#67e8f9',
                            }}
                        >
                            🚀 India’s Smartest Home Tutor Platform
                        </div>

                        <h1
                            style={{
                                fontSize: 'clamp(3rem,8vw,6rem)',
                                fontWeight: '900',
                                lineHeight: '1',
                            }}
                        >
                            Learn With
                            <span
                                style={{
                                    display: 'block',
                                    background: 'linear-gradient(90deg,#22d3ee,#3b82f6,#6366f1)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Elite Tutors
                            </span>
                        </h1>

                        <p className="text-secondary fs-5 mt-4">
                            Mentorix connects students with verified tutors for personalized
                            learning and premium education experience.
                        </p>

                        <div className="d-flex flex-wrap gap-3 mt-5">
                            <button onClick={() => navigate("/login")}
                                className="btn btn-info text-dark fw-bold px-5 py-3"
                                style={{ borderRadius: '20px' }}
                            >
                                Find Tutors
                            </button>

                            <button onClick={() => navigate("/tutor/register")}
                                className="btn btn-outline-light px-5 py-3"
                                style={{ borderRadius: '20px' }}
                            >
                                Become Tutor
                            </button>
                        </div>

                        <div className="d-flex gap-5 mt-5 flex-wrap">
                            {[
                                ['10K+', 'Students'],
                                ['2K+', 'Tutors'],
                                ['4.9★', 'Ratings'],
                            ].map((item, i) => (
                                <div key={i}>
                                    <h2 className="fw-bold">{item[0]}</h2>
                                    <p className="text-secondary">{item[1]}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                borderRadius: '35px',
                                padding: '40px',
                                backdropFilter: 'blur(25px)',
                            }}
                        >
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <p className="text-secondary m-0">Premium Learning</p>
                                    <h2 className="fw-bold mt-2">Personalized Education</h2>
                                </div>

                                <div
                                    className="d-flex align-items-center justify-content-center"
                                    style={{
                                        width: '70px',
                                        height: '70px',
                                        borderRadius: '22px',
                                        background: 'linear-gradient(135deg,#22d3ee,#3b82f6)',
                                        fontSize: '30px',
                                    }}
                                >
                                    🎓
                                </div>
                            </div>

                            {[
                                ['⚡', '1-on-1 Learning'],
                                ['📈', 'AI Tracking'],
                                ['🌟', 'Top Tutors'],
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className="d-flex justify-content-between align-items-center p-4 mb-3"
                                    style={{
                                        borderRadius: '24px',
                                        background: 'rgba(0,0,0,0.4)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                    }}
                                >
                                    <h5 className="m-0">{item[1]}</h5>
                                    <span style={{ fontSize: '24px' }}>{item[0]}</span>
                                </div>
                            ))}

                            <button onClick={() => navigate("/login")}
                                className="btn w-100 fw-bold py-3 mt-3"
                                style={{
                                    borderRadius: '20px',
                                    background: 'white',
                                    color: 'black',
                                }}
                            >
                                Start Learning
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Hero;