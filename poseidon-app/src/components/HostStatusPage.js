import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import yaml from 'js-yaml';

const HostStatusPage = () => {
  const [hostStatus, setHostStatus] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchHostStatus = async () => {
      try {
        // Check if location.state.hostStatus is valid
        const isValidHostStatus = location.state?.hostStatus && Object.keys(location.state.hostStatus).length > 0;
        // If hostStatus is not valid, make a GET request to /getHostStatus
        const data = isValidHostStatus
          ? location.state.hostStatus
          : (await axios.get('/getHostStatus')).data;

        setHostStatus(yaml.dump(data)); // Convert to YAML
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchHostStatus();
  }, [location.state]);

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Host Status</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleBackClick} style={{ marginTop: '20px' }}>Back to Home</button>
      <pre>{hostStatus}</pre> {/* Display YAML */}
    </div>
  );
};

export default HostStatusPage;
