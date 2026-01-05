import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<div className="container py-8 text-center" style={{ paddingTop: '4rem' }}><h1>Login Page Coming Soon</h1></div>} />
        {/* Placeholder for future routes */}
        <Route path="/student/*" element={<div>Student Dashboard</div>} />
        <Route path="/faculty/*" element={<div>Faculty Dashboard</div>} />
        <Route path="/admin/*" element={<div>Admin Dashboard</div>} />
      </Routes>
    </Router>
  );
}

export default App;
