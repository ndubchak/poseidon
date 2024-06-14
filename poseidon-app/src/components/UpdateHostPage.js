import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import yaml from 'js-yaml';
import { Form, Input, Button, Typography, message, Checkbox, Layout, Divider } from 'antd';

const { TextArea } = Input;
const { Title, Text } = Typography;
const { Header, Footer, Content } = Layout;

// Define custom YAML type for !image
const ImageType = new yaml.Type('!image', {
  kind: 'mapping',
  construct: data => data,
});

const CUSTOM_SCHEMA = yaml.Schema.create([ImageType]);

const UpdateHostPage = () => {
  const [form] = Form.useForm();
  const [updateError, setUpdateError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHostStatus = async () => {
      try {
        const response = await axios.get('/getHostStatus');
        if (response.data && response.data.length > 0) {
          const hostStatusYaml = response.data[0].host_status;
          console.log('Host Status YAML:', hostStatusYaml);
          const hostStatus = yaml.load(hostStatusYaml, { schema: CUSTOM_SCHEMA }); // Parse the YAML string with custom schema
          console.log('Host Status Parsed:', hostStatus);
          const spec = hostStatus?.spec;
          console.log('Extracted Spec:', spec);
          const specYaml = yaml.dump(spec, { schema: CUSTOM_SCHEMA });
          form.setFieldsValue({ hostConfig: specYaml });
        }
      } catch (error) {
        message.error('Failed to fetch host status: ' + error.message);
      }
    };

    fetchHostStatus();
  }, [form]);

  const handleSubmit = async (values) => {
    setUpdateError(null);
    const { hostConfig, allowedOperations } = values;

    let parsedHostConfig;

    try {
      parsedHostConfig = yaml.load(hostConfig);
    } catch (error) {
      setUpdateError('Invalid YAML input: ' + error.message);
      return;
    }

    const requestBody = {
      host_config: parsedHostConfig,
      allowed_operations: allowedOperations
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
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 20px' }}>
        <Title level={3} style={{ color: 'white', margin: 15 }}>
          Poseidon
        </Title>
      </Header>
      <Content style={{ padding: '50px', display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
        <div style={{ width: '100%', maxWidth: '800px' }}>
          <Button onClick={handleBackClick} style={{ marginBottom: '20px' }}>
            Back to Home
          </Button>
          <Title level={2}>Update Host</Title>
          <Divider />
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Allowed Operations"
              name="allowedOperations"
              rules={[{ required: true, message: 'Please select at least one operation!' }]}
            >
              <Checkbox.Group style={{ width: '100%' }}>
                <Checkbox value="stage">Stage</Checkbox>
                <Checkbox value="finalize">Finalize</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              label="Host Config (YAML)"
              name="hostConfig"
              rules={[{ required: true, message: 'Please input the host configuration in YAML format!' }]}
            >
              <TextArea
                rows={30}
                placeholder="key: value"
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Host
              </Button>
            </Form.Item>
          </Form>
          {updateError && <Text type="danger">{updateError}</Text>}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Created by Nadiia Dubchak, Adit Jha
        <br />
        Azure Linux Hackathon ©2024
      </Footer>
    </Layout>
  );
};

export default UpdateHostPage;
