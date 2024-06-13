import React, { useState, useEffect } from 'react';
import axios from 'axios';

const HostStatusPage = () => {
  const [hostStatus, setHostStatus] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getHostStatus = async () => {
      try {
        const response = await axios.get('/getHostStatus');
        setHostStatus(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
      }
    };

    getHostStatus();
  }, []);

  return (
    <div>
      <h1>Host Status</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <pre>{JSON.stringify(hostStatus, null, 2)}</pre>
    </div>
  );
};

export default HostStatusPage;
