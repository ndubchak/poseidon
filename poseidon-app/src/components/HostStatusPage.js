import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import yaml from 'js-yaml';

const HostStatusPage = () => {
  const [hostStatus, setHostStatus] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getHostStatus = async () => {
      try {
        const response = await axios.get('/getHostStatus');
        setHostStatus(yaml.dump(response.data)); // Convert to YAML
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    getHostStatus();
  }, []);

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
