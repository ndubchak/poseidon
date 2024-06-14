import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import HostStatusPage from './components/HostStatusPage';
import UpdateHostPage from './components/UpdateHostPage';
import UpdatingHostPage from './components/UpdatingHostPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/update-host" element={<UpdateHostPage />} />
        <Route path="/host-status" element={<HostStatusPage />} />
        <Route path="/updating-host" element={<UpdatingHostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
