import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import yaml from 'js-yaml';


const UpdateHostPage = () => {
  const [hostStatus, setHostStatus] = useState([]);
  const [error, setError] = useState(null);
  const [hostConfig, setHostConfig] = useState('');
  const [allowedOperations, setAllowedOperations] = useState('');
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const navigate = useNavigate();

  // Fetch host status
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

  // Handle form submission for updating host
  const handleSubmit = async (event) => {
    event.preventDefault();
    setUpdateSuccess(null);
    setUpdateError(null);

    let parsedHostConfig;
    let parsedAllowedOperations;

    try {
      parsedHostConfig = yaml.load(hostConfig);
      parsedAllowedOperations = yaml.load(allowedOperations);
    } catch (error) {
      setUpdateError('Invalid YAML input: ' + error.message);
      return;
    }

    const requestBody = {
      host_config: parsedHostConfig,
      allowed_operations: parsedAllowedOperations
    };

    console.log('Update request:', requestBody);

    try {
      const response = await axios.post('/updateHost', requestBody);
      console.log('Update response:', response.data);
      setUpdateSuccess('Host updated successfully!');
      setHostStatus(yaml.dump(response.data)); // Convert to YAML
      setHostConfig(''); // Clear input after successful submission
      setAllowedOperations(''); // Clear input after successful submission
    } catch (error) {
      console.error('Error in POST request:', error);
      setUpdateError('Failed to update host: ' + error.message);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>Current Host Status</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={handleBackClick} style={{ marginTop: '20px' }}>Back to Home</button>
      <pre>{hostStatus}</pre> {/* Display YAML */}

      <h2>Update Host</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="hostConfig">Host Config (YAML):</label>
          <textarea
            id="hostConfig"
            value={hostConfig}
            onChange={(e) => setHostConfig(e.target.value)}
            placeholder="key: value"
            rows={5}
            style={{ width: '100%' }}
          />
        </div>
        <div>
          <label htmlFor="allowedOperations">Allowed Operations (comma-separated):</label>
          <textarea
            id="allowedOperations"
            value={allowedOperations}
            onChange={(e) => setAllowedOperations(e.target.value)}
            placeholder="key: value"
            rows={5}
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit">Update Host</button>
      </form>

      {updateSuccess && <div style={{ color: 'green' }}>{updateSuccess}</div>}
      {updateError && <div style={{ color: 'red' }}>{updateError}</div>}
    </div>
  );
};

export default UpdateHostPage;
