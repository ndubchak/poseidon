import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import yaml from 'js-yaml';
import { Button, Typography, Alert } from 'antd';

const { Title, Paragraph } = Typography;

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
      <Title level={2}>Host Status</Title>
      {error && <Alert message="Error" description={error} type="error" showIcon />}
      <Button type="primary" onClick={handleBackClick} style={{ marginTop: '20px' }}>Back to Home</Button>
      <Paragraph>
        <pre style={{ whiteSpace: 'pre-wrap' }}>{hostStatus}</pre> {/* Display YAML */}
      </Paragraph>
    </div>
  );
};

export default HostStatusPage;
