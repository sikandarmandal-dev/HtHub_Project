import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppLayout, AuthPage, Dashboard, HomePage, Protected, TutorDetailPage, TutorSearchPage } from './pages/ProductPages';
import './App.css';

function Page({children}) { return <AppLayout>{children}</AppLayout>; }
function DashboardRoute({kind,section,roles}) { return <Protected roles={roles}><Page><Dashboard kind={kind} section={section}/></Page></Protected>; }
function NotFound() { return <Page><div className="page-state"><span className="eyebrow">404 · PAGE NOT FOUND</span><h1>That page wandered off.</h1><p>Let's get you back to a useful place.</p><Link className="button primary" to="/">Return home</Link></div></Page>; }
function App() {
  return <AuthProvider><BrowserRouter><Routes>
    <Route path="/" element={<Page><HomePage/></Page>}/>
    <Route path="/login" element={<Page><AuthPage mode="login"/></Page>}/>
    <Route path="/register" element={<Page><AuthPage mode="register"/></Page>}/>
    <Route path="/tutors" element={<Page><TutorSearchPage/></Page>}/>
    <Route path="/tutors/:id" element={<Page><TutorDetailPage/></Page>}/>
    <Route path="/student" element={<DashboardRoute kind="student" roles={['student']}/>}/>
    <Route path="/student/profile" element={<DashboardRoute kind="student" section="profile" roles={['student']}/>}/>
    <Route path="/student/requests" element={<DashboardRoute kind="student" section="requests" roles={['student']}/>}/>
    <Route path="/tutor" element={<DashboardRoute kind="tutor" roles={['tutor']}/>}/>
    <Route path="/tutor/profile" element={<DashboardRoute kind="tutor" section="profile" roles={['tutor']}/>}/>
    <Route path="/tutor/requests" element={<DashboardRoute kind="tutor" section="requests" roles={['tutor']}/>}/>
    <Route path="/admin" element={<DashboardRoute kind="admin" roles={['admin']}/>}/>
    <Route path="/admin/users" element={<DashboardRoute kind="admin" section="users" roles={['admin']}/>}/>
    <Route path="/admin/verifications" element={<DashboardRoute kind="admin" section="verifications" roles={['admin']}/>}/>
    <Route path="/admin/requests" element={<DashboardRoute kind="admin" section="requests" roles={['admin']}/>}/>
    <Route path="*" element={<NotFound/>}/>
  </Routes></BrowserRouter></AuthProvider>;
}
export default App;
