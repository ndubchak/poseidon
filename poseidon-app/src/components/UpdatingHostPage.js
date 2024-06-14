import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Spin, Typography, Layout, message } from "antd";

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const UpdatingHostPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let retryCount = 0;
    const MAX_RETRIES = 10;

    const fetchHostStatus = async () => {
      const RETRY_INTERVAL = Math.min(1000 * 2 ** retryCount, 30000); // Exponential backoff
      try {
        const response = await axios.get('/getHostStatus');
        if (response.data && Object.keys(response.data).length > 0) {
          message.success('Host updated successfully!');
          navigate('/host-status', { state: { hostStatus: response.data } });
        } else {
          // Throw an error if the response data is empty
          throw new Error('Failed to get host status');
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
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 20px' }}>
        <Title level={3} style={{ color: 'white', margin: 15 }}>
          Poseidon
        </Title>
      </Header>
      <Content style={{ padding: '50px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2}>Updating Host Machine</Title>
          <Spin size="large" style={{ margin: '20px 0' }} />
          <p>Please wait while the host is being updated.</p>
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

export default UpdatingHostPage;
