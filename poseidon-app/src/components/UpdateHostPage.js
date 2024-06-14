import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import yaml from 'js-yaml';
import { Form, Input, Button, Typography, message } from 'antd';

const { TextArea } = Input;

const { Title } = Typography;

const UpdateHostPage = () => {
  const [updateError, setUpdateError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setUpdateError(null);
    const { hostConfig, allowedOperations } = values;

    let parsedHostConfig;
    let parsedAllowedOperations;

    try {
      parsedHostConfig = yaml.load(hostConfig);
      parsedAllowedOperations = allowedOperations
        .split(',')
        .map(op => op.trim());
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
      <Title level={2}>Update Host</Title>
      <Form
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Host Config (YAML)"
          name="hostConfig"
          rules={[{ required: true, message: 'Please input the host configuration in YAML format!' }]}
        >
          <TextArea
            rows={5}
            placeholder="key: value"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Allowed Operations (comma-separated)"
          name="allowedOperations"
          rules={[{ required: true, message: 'Please input the allowed operations!' }]}
        >
          <Input
            placeholder="example: update, transition"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Host
          </Button>
        </Form.Item>
      </Form>
      {updateError && <div style={{ color: 'red' }}>{updateError}</div>}
      <Button onClick={handleBackClick} style={{ marginTop: '20px' }}>
        Back to Home
      </Button>
    </div>
  );
};

export default UpdateHostPage;
