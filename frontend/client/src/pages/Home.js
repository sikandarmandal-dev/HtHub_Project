// // import 'bootstrap/dist/css/bootstrap.min.css'
// // import 'bootstrap/dist/js/bootstrap.bundle.min'
// import { useEffect, useState } from 'react'

// export default function MentorixBootstrapLanding() {
//     const [loaded, setLoaded] = useState(false)

//     useEffect(() => {
//         setLoaded(true)
//     }, [])

//     return (
//         <div
//             style={{
//                 background: '#050816',
//                 minHeight: '100vh',
//                 color: 'white',
//                 overflowX: 'hidden',
//                 fontFamily: 'Inter, sans-serif',
//                 opacity: loaded ? 1 : 0,
//                 transform: loaded ? 'translateY(0px)' : 'translateY(20px)',
//                 transition: 'all 1s ease',
//             }}
//         >
//             {/* Navbar */}
//             {/* Navbar */}
//             {/* Navbar */}
//             <nav
//                 className="navbar navbar-expand-lg navbar-dark sticky-top"
//                 style={{
//                     backdropFilter: 'blur(28px)',
//                     background: 'rgba(2,6,23,0.78)',
//                     borderBottom: '1px solid rgba(255,255,255,0.06)',
//                     padding: '18px 0',
//                     zIndex: 1000,
//                 }}
//             >
//                 <div className="container-fluid px-lg-5 px-4">
//                     <div className="d-flex align-items-center justify-content-between w-100">

//                         {/* Logo */}
//                         <a
//                             className="navbar-brand d-flex align-items-center gap-3 m-0"
//                             href="/"
//                         >
//                             <div
//                                 style={{
//                                     width: '60px',
//                                     height: '60px',
//                                     borderRadius: '22px',
//                                     position: 'relative',
//                                     overflow: 'hidden',
//                                     background: 'rgba(255,255,255,0.04)',
//                                     border: '1px solid rgba(255,255,255,0.08)',
//                                     display: 'flex',
//                                     alignItems: 'center',
//                                     justifyContent: 'center',
//                                     backdropFilter: 'blur(20px)',
//                                     boxShadow: '0 0 40px rgba(34,211,238,0.12)',
//                                 }}
//                             >
//                                 <div
//                                     style={{
//                                         position: 'absolute',
//                                         inset: 0,
//                                         background:
//                                             'linear-gradient(135deg,rgba(34,211,238,0.12),rgba(59,130,246,0.08),rgba(168,85,247,0.10))',
//                                     }}
//                                 ></div>

//                                 <span
//                                     style={{
//                                         position: 'relative',
//                                         fontSize: '24px',
//                                         fontWeight: '900',
//                                         letterSpacing: '-3px',
//                                         color: 'white',
//                                     }}
//                                 >
//                                     MX
//                                 </span>

//                                 <div
//                                     style={{
//                                         position: 'absolute',
//                                         top: '10px',
//                                         right: '10px',
//                                         width: '8px',
//                                         height: '8px',
//                                         borderRadius: '50%',
//                                         background: '#22d3ee',
//                                         boxShadow: '0 0 15px rgba(34,211,238,1)',
//                                     }}
//                                 ></div>
//                             </div>

//                             <div>
//                                 <h4
//                                     className="m-0 fw-bold"
//                                     style={{
//                                         color: 'white',
//                                         fontSize: '22px',
//                                         letterSpacing: '-0.5px',
//                                     }}
//                                 >
//                                     Mentorix
//                                 </h4>

//                                 <small
//                                     style={{
//                                         color: 'rgba(255,255,255,0.45)',
//                                         fontSize: '13px',
//                                         letterSpacing: '0.4px',
//                                     }}
//                                 >
//                                     AI Powered Tutor Platform
//                                 </small>
//                             </div>
//                         </a>

//                         {/* Mobile Toggle */}
//                         <button
//                             className="navbar-toggler border-0 shadow-none d-lg-none"
//                             type="button"
//                             data-bs-toggle="collapse"
//                             data-bs-target="#navMenu"
//                         >
//                             <span className="navbar-toggler-icon"></span>
//                         </button>

//                         {/* Menu */}
//                         <div
//                             className="collapse navbar-collapse align-items-center"
//                             id="navMenu"
//                         >
//                             {/* Links */}
//                             <ul
//                                 className="navbar-nav mx-auto flex-column flex-lg-row align-items-lg-center mt-4 mt-lg-0"
//                                 style={{
//                                     gap: '28px',
//                                 }}
//                             >
//                                 {['Features', 'Subjects', 'Reviews'].map((item, i) => (
//                                     <li className="nav-item" key={i}>
//                                         <a
//                                             className="nav-link"
//                                             href={`#${item.toLowerCase()}`}
//                                             style={{
//                                                 color: 'rgba(255,255,255,0.78)',
//                                                 fontSize: '15px',
//                                                 fontWeight: '500',
//                                                 transition: '0.3s ease',
//                                             }}
//                                         >
//                                             {item}
//                                         </a>
//                                     </li>
//                                 ))}
//                             </ul>

//                             {/* Buttons */}
//                             <div
//                                 className="d-flex flex-column flex-lg-row align-items-center mt-4 mt-lg-0"
//                                 style={{
//                                     gap: '14px',
//                                 }}
//                             >
//                                 <button
//                                     className="btn text-white px-4 py-2"
//                                     style={{
//                                         borderRadius: '999px',
//                                         border: '1px solid rgba(255,255,255,0.08)',
//                                         background: 'rgba(255,255,255,0.03)',
//                                         backdropFilter: 'blur(20px)',
//                                         fontWeight: '600',
//                                         minWidth: '120px',
//                                     }}
//                                 >
//                                     Login
//                                 </button>

//                                 <button
//                                     className="btn px-4 py-2 fw-semibold"
//                                     style={{
//                                         borderRadius: '999px',
//                                         background:
//                                             'linear-gradient(135deg,#06b6d4,#3b82f6,#8b5cf6)',
//                                         color: 'white',
//                                         border: 'none',
//                                         minWidth: '140px',
//                                         boxShadow: '0 0 35px rgba(34,211,238,0.22)',
//                                     }}
//                                 >
//                                     Get Started
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </nav>
//             {/* Hero */}
//             <section className="container py-5" style={{ paddingTop: '120px' }}>
//                 <div className="row align-items-center g-5">
//                     <div className="col-lg-6">
//                         <div
//                             className="d-inline-flex align-items-center gap-2 px-4 py-2 mb-4"
//                             style={{
//                                 borderRadius: '999px',
//                                 background: 'rgba(34,211,238,0.12)',
//                                 border: '1px solid rgba(34,211,238,0.2)',
//                                 color: '#67e8f9',
//                             }}
//                         >
//                             🚀 India’s Smartest Home Tutor Platform
//                         </div>

//                         <h1
//                             style={{
//                                 fontSize: 'clamp(3rem,8vw,6rem)',
//                                 fontWeight: '900',
//                                 lineHeight: '1',
//                             }}
//                         >
//                             Learn With
//                             <span
//                                 style={{
//                                     display: 'block',
//                                     background: 'linear-gradient(90deg,#22d3ee,#3b82f6,#6366f1)',
//                                     WebkitBackgroundClip: 'text',
//                                     WebkitTextFillColor: 'transparent',
//                                 }}
//                             >
//                                 Elite Tutors
//                             </span>
//                         </h1>

//                         <p className="text-secondary fs-5 mt-4">
//                             Mentorix connects students with verified tutors for personalized
//                             learning and premium education experience.
//                         </p>

//                         <div className="d-flex flex-wrap gap-3 mt-5">
//                             <button
//                                 className="btn btn-info text-dark fw-bold px-5 py-3"
//                                 style={{ borderRadius: '20px' }}
//                             >
//                                 Find Tutors
//                             </button>

//                             <button
//                                 className="btn btn-outline-light px-5 py-3"
//                                 style={{ borderRadius: '20px' }}
//                             >
//                                 Become Tutor
//                             </button>
//                         </div>

//                         <div className="d-flex gap-5 mt-5 flex-wrap">
//                             {[
//                                 ['10K+', 'Students'],
//                                 ['2K+', 'Tutors'],
//                                 ['4.9★', 'Ratings'],
//                             ].map((item, i) => (
//                                 <div key={i}>
//                                     <h2 className="fw-bold">{item[0]}</h2>
//                                     <p className="text-secondary">{item[1]}</p>
//                                 </div>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="col-lg-6">
//                         <div
//                             style={{
//                                 background: 'rgba(255,255,255,0.05)',
//                                 border: '1px solid rgba(255,255,255,0.08)',
//                                 borderRadius: '35px',
//                                 padding: '40px',
//                                 backdropFilter: 'blur(25px)',
//                             }}
//                         >
//                             <div className="d-flex justify-content-between align-items-center mb-4">
//                                 <div>
//                                     <p className="text-secondary m-0">Premium Learning</p>
//                                     <h2 className="fw-bold mt-2">Personalized Education</h2>
//                                 </div>

//                                 <div
//                                     className="d-flex align-items-center justify-content-center"
//                                     style={{
//                                         width: '70px',
//                                         height: '70px',
//                                         borderRadius: '22px',
//                                         background: 'linear-gradient(135deg,#22d3ee,#3b82f6)',
//                                         fontSize: '30px',
//                                     }}
//                                 >
//                                     🎓
//                                 </div>
//                             </div>

//                             {[
//                                 ['⚡', '1-on-1 Learning'],
//                                 ['📈', 'AI Tracking'],
//                                 ['🌟', 'Top Tutors'],
//                             ].map((item, i) => (
//                                 <div
//                                     key={i}
//                                     className="d-flex justify-content-between align-items-center p-4 mb-3"
//                                     style={{
//                                         borderRadius: '24px',
//                                         background: 'rgba(0,0,0,0.4)',
//                                         border: '1px solid rgba(255,255,255,0.08)',
//                                     }}
//                                 >
//                                     <h5 className="m-0">{item[1]}</h5>
//                                     <span style={{ fontSize: '24px' }}>{item[0]}</span>
//                                 </div>
//                             ))}

//                             <button
//                                 className="btn w-100 fw-bold py-3 mt-3"
//                                 style={{
//                                     borderRadius: '20px',
//                                     background: 'white',
//                                     color: 'black',
//                                 }}
//                             >
//                                 Start Learning
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             {/* Features */}
//             <section id="features" className="container py-5">
//                 <div className="text-center mb-5">
//                     <p style={{ color: '#22d3ee', letterSpacing: '4px' }}>FEATURES</p>
//                     <h2 className="display-4 fw-bold">Why Students Love Mentorix</h2>
//                 </div>

//                 <div className="row g-4">
//                     {[
//                         ['🤖', 'Smart Matching'],
//                         ['🎥', 'Interactive Classes'],
//                         ['📊', 'Analytics'],
//                         ['✅', 'Verified Tutors'],
//                         ['⏰', 'Flexible Schedule'],
//                         ['💸', 'Affordable Pricing'],
//                     ].map((item, i) => (
//                         <div className="col-md-6 col-lg-4" key={i}>
//                             <div
//                                 className="h-100 p-4"
//                                 style={{
//                                     borderRadius: '30px',
//                                     background: 'rgba(255,255,255,0.05)',
//                                     border: '1px solid rgba(255,255,255,0.08)',
//                                 }}
//                             >
//                                 <div style={{ fontSize: '50px' }}>{item[0]}</div>
//                                 <h3 className="fw-bold mt-4">{item[1]}</h3>
//                                 <p className="text-secondary mt-3">
//                                     Premium startup-style learning experience.
//                                 </p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* Subjects */}
//             <section id="subjects" className="container py-5">
//                 <div className="text-center mb-5">
//                     <p style={{ color: '#22d3ee', letterSpacing: '4px' }}>SUBJECTS</p>
//                     <h2 className="display-4 fw-bold">Learn Anything You Want</h2>
//                     <p className="text-secondary fs-5 mt-4 mx-auto" style={{ maxWidth: '700px' }}>
//                         From school academics to coding and competitive exams — Mentorix helps students master every subject.
//                     </p>
//                 </div>

//                 <div className="row g-4">
//                     {[
//                         ['📘', 'Mathematics'],
//                         ['⚛️', 'Physics'],
//                         ['🧪', 'Chemistry'],
//                         ['🧬', 'Biology'],
//                         ['💻', 'Coding'],
//                         ['📝', 'English'],
//                         ['📈', 'Commerce'],
//                         ['🏆', 'Competitive Exams'],
//                     ].map((item, i) => (
//                         <div className="col-md-6 col-lg-3" key={i}>
//                             <div
//                                 className="h-100 p-4 text-center"
//                                 style={{
//                                     borderRadius: '28px',
//                                     background: 'rgba(255,255,255,0.05)',
//                                     border: '1px solid rgba(255,255,255,0.08)',
//                                     backdropFilter: 'blur(20px)',
//                                 }}
//                             >
//                                 <div style={{ fontSize: '55px' }}>{item[0]}</div>
//                                 <h3 className="fw-bold mt-4">{item[1]}</h3>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* Reviews */}
//             <section id="reviews" className="container py-5">
//                 <div className="text-center mb-5">
//                     <p style={{ color: '#22d3ee', letterSpacing: '4px' }}>REVIEWS</p>
//                     <h2 className="display-4 fw-bold">Students Are Loving It</h2>
//                 </div>

//                 <div className="row g-4">
//                     {[
//                         ['Aarav Sharma', 'The UI and learning experience feel absolutely premium.'],
//                         ['Priya Singh', 'Mentorix made learning fun and personalized.'],
//                         ['Rahul Verma', 'One of the best tutor platforms I have ever used.'],
//                     ].map((item, i) => (
//                         <div className="col-lg-4" key={i}>
//                             <div
//                                 className="h-100 p-4"
//                                 style={{
//                                     borderRadius: '30px',
//                                     background: 'rgba(255,255,255,0.05)',
//                                     border: '1px solid rgba(255,255,255,0.08)',
//                                 }}
//                             >
//                                 <div className="text-warning fs-4 mb-3">★★★★★</div>
//                                 <p className="text-secondary fs-5">“{item[1]}”</p>

//                                 <div className="d-flex align-items-center gap-3 mt-4">
//                                     <div
//                                         style={{
//                                             width: '55px',
//                                             height: '55px',
//                                             borderRadius: '50%',
//                                             background: 'linear-gradient(135deg,#22d3ee,#6366f1)',
//                                         }}
//                                     ></div>

//                                     <div>
//                                         <h5 className="m-0 fw-bold">{item[0]}</h5>
//                                         <small className="text-secondary">Student</small>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </section>

//             {/* CTA */}
//             <section className="container py-5">
//                 <div
//                     className="text-center"
//                     style={{
//                         borderRadius: '40px',
//                         padding: '80px 30px',
//                         background:
//                             'linear-gradient(135deg,rgba(34,211,238,0.18),rgba(99,102,241,0.18))',
//                         border: '1px solid rgba(255,255,255,0.08)',
//                         backdropFilter: 'blur(20px)',
//                     }}
//                 >
//                     <h2 className="display-3 fw-bold">
//                         Ready To Transform
//                         <span
//                             style={{
//                                 display: 'block',
//                                 background: 'linear-gradient(90deg,#22d3ee,#818cf8)',
//                                 WebkitBackgroundClip: 'text',
//                                 WebkitTextFillColor: 'transparent',
//                             }}
//                         >
//                             Your Learning Journey?
//                         </span>
//                     </h2>

//                     <p className="text-secondary fs-5 mt-4 mx-auto" style={{ maxWidth: '800px' }}>
//                         Join thousands of students already learning smarter with Mentorix.
//                     </p>

//                     <div className="d-flex justify-content-center gap-4 flex-wrap mt-5">
//                         <button
//                             className="btn btn-light text-dark fw-bold px-5 py-3"
//                             style={{ borderRadius: '20px' }}
//                         >
//                             Start Learning
//                         </button>

//                         <button
//                             className="btn btn-outline-light px-5 py-3"
//                             style={{ borderRadius: '20px' }}
//                         >
//                             Explore Tutors
//                         </button>
//                     </div>
//                 </div>
//             </section>

//             {/* Footer */}
//             <footer
//                 className="mt-5"
//                 style={{
//                     borderTop: '1px solid rgba(255,255,255,0.08)',
//                     background: 'rgba(255,255,255,0.03)',
//                     padding: '80px 0 30px',
//                 }}
//             >
//                 <div className="container">
//                     <div className="row g-5">
//                         <div className="col-lg-4">
//                             <h2 className="fw-bold">Mentorix</h2>
//                             <p className="text-secondary mt-4">
//                                 Premium home tutoring platform with futuristic learning experience.
//                             </p>
//                         </div>

//                         <div className="col-lg-2 col-6">
//                             <h5 className="fw-bold mb-4">Platform</h5>
//                             <div className="d-flex flex-column gap-3 text-secondary">
//                                 <span>Find Tutors</span>
//                                 <span>Courses</span>
//                                 <span>Dashboard</span>
//                             </div>
//                         </div>

//                         <div className="col-lg-2 col-6">
//                             <h5 className="fw-bold mb-4">Resources</h5>
//                             <div className="d-flex flex-column gap-3 text-secondary">
//                                 <span>Blog</span>
//                                 <span>Help Center</span>
//                                 <span>Community</span>
//                             </div>
//                         </div>

//                         <div className="col-lg-4">
//                             <h5 className="fw-bold mb-4">Connect</h5>

//                             <div className="d-flex gap-3 mb-4 fs-3">
//                                 <span>🌐</span>
//                                 <span>📸</span>
//                                 <span>🐦</span>
//                                 <span>💼</span>
//                             </div>

//                             <p className="text-secondary">support@mentorix.com</p>
//                         </div>
//                     </div>

//                     <div
//                         className="d-flex flex-column flex-lg-row justify-content-between align-items-center pt-5 mt-5"
//                         style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
//                     >
//                         <p className="text-secondary m-0">
//                             © 2026 Mentorix. All rights reserved.
//                         </p>

//                         <div className="d-flex gap-4 mt-3 mt-lg-0 text-secondary">
//                             <span>Privacy</span>
//                             <span>Terms</span>
//                             <span>Cookies</span>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     )
// }
