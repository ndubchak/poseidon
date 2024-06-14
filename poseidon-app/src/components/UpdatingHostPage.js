import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdatingHostPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let retryCount = 0;
    const MAX_RETRIES = 10;

    const fetchHostStatus = async () => {
      const RETRY_INTERVAL = Math.min(1000 * 2 ** retryCount, 30000); // Exponential backoff
      try {
        const response = await axios.get('/getHostStatus');
        if (response.data) {
          navigate('/host-status', { state: { hostStatus: response.data } });
        }
      } catch (error) {
        console.error('Error fetching host status:', error);
        if (retryCount < MAX_RETRIES) {
          setTimeout(fetchHostStatus, RETRY_INTERVAL); // Retry with exponential backoff
          retryCount += 1;
        } else {
          console.error('Max retries reached. Failed to get host status.');
        }
      }
    };

    fetchHostStatus();
  }, [navigate]);

  return (
    <div>
      <h1>Updating your host...</h1>
      <p>Please wait while the host is being updated.</p>
    </div>
  );
};

export default UpdatingHostPage;
