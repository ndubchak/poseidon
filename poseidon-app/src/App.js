import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HostStatusPage from './components/HostStatusPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/host-status" element={<HostStatusPage />} />
      </Routes>
    </Router>
  );
}

export default App;
