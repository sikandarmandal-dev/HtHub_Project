import React from 'react';
function Footer() {
    return (
        <div>
            <footer
                className="mt-5"
                style={{
                    borderTop: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(28px)',
                    background: 'rgba(2,6,23,0.78)',
                    padding: '80px 0 30px',
                }}
            >
                <div className="container">
                    <div className="row g-5">
                        <div className="col-lg-4">
                            <h2 className="fw-bold">Mentorix</h2>
                            <p className="text-secondary mt-4">
                                Premium home tutoring platform with futuristic learning experience.
                            </p>
                        </div>

                        <div className="col-lg-2 col-6">
                            <h5 className="fw-bold mb-4">Platform</h5>
                            <div className="d-flex flex-column gap-3 text-secondary">
                                <span>Find Tutors</span>
                                <span>Courses</span>
                                <span>Dashboard</span>
                            </div>
                        </div>

                        <div className="col-lg-2 col-6">
                            <h5 className="fw-bold mb-4">Resources</h5>
                            <div className="d-flex flex-column gap-3 text-secondary">
                                <span>Blog</span>
                                <span>Help Center</span>
                                <span>Community</span>
                            </div>
                        </div>

                        <div className="col-lg-4">
                            <h5 className="fw-bold mb-4">Connect</h5>

                            <div className="d-flex gap-3 mb-4 fs-3">
                                <span>🌐</span>
                                <span>📸</span>
                                <span>🐦</span>
                                <span>💼</span>
                            </div>

                            <p className="text-secondary">support@mentorix.com</p>
                        </div>
                    </div>

                    <div
                        className="d-flex flex-column flex-lg-row justify-content-between align-items-center pt-5 mt-5"
                        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
                    >
                        <p className="text-secondary m-0">
                            © 2026 Mentorix. All rights reserved.
                        </p>

                        <div className="d-flex gap-4 mt-3 mt-lg-0 text-secondary">
                            <span>Privacy</span>
                            <span>Terms</span>
                            <span>Cookies</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;