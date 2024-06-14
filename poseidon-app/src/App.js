import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import HostStatusPage from './components/HostStatusPage';
import UpdateHostPage from './components/UpdateHostPage';
import UpdatingHostPage from './components/UpdatingHostPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/update-host" element={<UpdateHostPage />} />
        <Route path="/host-status" element={<HostStatusPage />} />
        <Route path="/updating-host" element={<UpdatingHostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
