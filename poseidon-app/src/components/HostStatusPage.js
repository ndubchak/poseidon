import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import yaml from 'js-yaml';
import { Button, Typography, Alert, Layout, Divider } from 'antd';

const { Header, Footer, Content } = Layout;
const { Title, Paragraph } = Typography;

// Define custom YAML type for !image
const ImageType = new yaml.Type('!image', {
  kind: 'mapping',
  construct: data => data,
});

const CUSTOM_SCHEMA = yaml.Schema.create([ImageType]);

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

        const hostStatusYaml = data[0].host_status;
        const hostStatus = yaml.load(hostStatusYaml, { schema: CUSTOM_SCHEMA }); // Parse the YAML string with custom schema
        const spec = hostStatus?.spec;
        const specYaml = yaml.dump(spec, { schema: CUSTOM_SCHEMA });
        setHostStatus(specYaml); // Convert to YAML
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
          <Title level={2}>Host Status</Title>
          <Divider />
          {error && <Alert message="Error" description={error} type="error" showIcon />}
          <Paragraph>
            <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f6f8fa', padding: '10px', borderRadius: '5px' }}>{hostStatus}</pre> {/* Display YAML */}
          </Paragraph>
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

export default HostStatusPage;
