import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import yaml from 'js-yaml';

const UpdateHostPage = () => {
  const [hostConfig, setHostConfig] = useState('');
  const [allowedOperations, setAllowedOperations] = useState('');
  const [updateError, setUpdateError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
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

    try {
      await axios.post('/updateHost', requestBody);
      navigate('/updating-host');
    } catch (error) {
      setUpdateError('Failed to update host: ' + error.message);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div>
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
          <input
            type="text"
            id="allowedOperations"
            value={allowedOperations}
            onChange={(e) => setAllowedOperations(e.target.value)}
            placeholder="operation1, operation2"
            style={{ width: '100%' }}
          />
        </div>
        <button type="submit">Update Host</button>
      </form>

      {updateError && <div style={{ color: 'red' }}>{updateError}</div>}
      <button onClick={handleBackClick} style={{ marginTop: '20px' }}>Back to Home</button>
    </div>
  );
};

export default UpdateHostPage;
