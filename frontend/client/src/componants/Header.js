import React from 'react';
function Navbar() {
    return (
        <div>
            <nav
                className="navbar navbar-expand-lg navbar-dark sticky-top"
                style={{
                    backdropFilter: 'blur(28px)',
                    background: 'rgba(2,6,23,0.78)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    padding: '18px 0',
                    zIndex: 1000,
                }}
            >
                <div className="container-fluid px-lg-5 px-4">
                    <div className="d-flex align-items-center justify-content-between w-100">
                        <a
                            className="navbar-brand d-flex align-items-center gap-3 m-0"
                            href="/"
                        >
                            <div
                                style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '22px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backdropFilter: 'blur(20px)',
                                    boxShadow: '0 0 40px rgba(34,211,238,0.12)',
                                }}
                            >
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        background:
                                            'linear-gradient(135deg,rgba(34,211,238,0.12),rgba(59,130,246,0.08),rgba(168,85,247,0.10))',
                                    }}
                                ></div>

                                <span
                                    style={{
                                        position: 'relative',
                                        fontSize: '24px',
                                        fontWeight: '900',
                                        letterSpacing: '-3px',
                                        color: 'white',
                                    }}
                                >
                                    MX
                                </span>

                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '10px',
                                        right: '10px',
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        background: '#22d3ee',
                                        boxShadow: '0 0 15px rgba(34,211,238,1)',
                                    }}
                                ></div>
                            </div>

                            <div>
                                <h4
                                    className="m-0 fw-bold"
                                    style={{
                                        color: 'white',
                                        fontSize: '22px',
                                        letterSpacing: '-0.5px',
                                    }}
                                >
                                    Mentorix
                                </h4>

                                <small
                                    style={{
                                        color: 'rgba(255,255,255,0.45)',
                                        fontSize: '13px',
                                        letterSpacing: '0.4px',
                                    }}
                                >
                                    AI Powered Tutor Platform
                                </small>
                            </div>
                        </a>

                        <button
                            className="navbar-toggler border-0 shadow-none d-lg-none"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navMenu"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div
                            className="collapse navbar-collapse align-items-center"
                            id="navMenu"
                        >
                            <ul
                                className="navbar-nav mx-auto flex-column flex-lg-row align-items-lg-center mt-4 mt-lg-0"
                                style={{
                                    gap: '28px',
                                }}
                            >
                                {['Find Tutor', 'Become Tutor', 'Contact Us', 'About Us'].map((item, i) => (
                                    <li className="nav-item" key={i}>
                                        <a
                                            className="nav-link"
                                            href={`#${item.toLowerCase()}`}
                                            style={{
                                                color: 'rgba(255,255,255,0.78)',
                                                fontSize: '15px',
                                                fontWeight: '500',
                                                transition: '0.3s ease',
                                            }}
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>

                            <div
                                className="d-flex flex-column flex-lg-row align-items-center mt-4 mt-lg-0"
                                style={{
                                    gap: '14px',
                                }}
                            >
                                <button
                                    className="btn text-white px-4 py-2"
                                    style={{
                                        borderRadius: '999px',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        background: 'rgba(255,255,255,0.03)',
                                        backdropFilter: 'blur(20px)',
                                        fontWeight: '600',
                                        minWidth: '120px',
                                    }}
                                >
                                    Login
                                </button>

                                <button
                                    className="btn px-4 py-4 fw-semibold"
                                    style={{
                                        // borderRadius: '500px',
                                        background:
                                            'linear-gradient(135deg,#06b6d4,#3b82f6,#8b5cf6)',
                                        color: 'white',
                                        border: 'none',
                                        minWidth: '140px',
                                        boxShadow: '0 0 35px rgba(34,211,238,0.22)',
                                    }}
                                >
                                    Get Started
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;