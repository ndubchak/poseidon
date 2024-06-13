import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/host-status');
  };

  return (
    <div>
      <h1>Welcome to Poseidon App</h1>
      <button onClick={handleButtonClick}>Get Host Status</button>
    </div>
  );
};

export default LandingPage;
