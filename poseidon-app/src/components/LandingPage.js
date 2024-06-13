import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetHostStatusClick = () => {
    navigate('/host-status');
  };

  const handleUpdateHostClick = () => {
    navigate('/update-host');
  };

  return (
    <div className="landing-container">
      <h1>Welcome to Poseidon App</h1>
      <button className="btn-primary" onClick={handleGetHostStatusClick}>
        Get Host Status
      </button>
      <button className="btn-secondary" onClick={handleUpdateHostClick}>
        Update Host
      </button>
    </div>
  );
};

export default LandingPage;
