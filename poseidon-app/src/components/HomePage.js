import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';

const { Header, Footer } = Layout;
const { Title } = Typography;

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetHostStatusClick = () => {
    navigate('/host-status');
  };

  const handleUpdateHostClick = () => {
    navigate('/update-host');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#001529', padding: '0 20px' }}>
        <Title level={3} style={{ color: 'white', margin: 0 }}>
          Poseidon
        </Title>
      </Header>
      <Content style={{ padding: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2}>Trident Host Management</Title>
          <Button type="primary" size="large" onClick={handleGetHostStatusClick} style={{ margin: '10px' }}>
            Get Host Status
          </Button>
          <Button type="default" size="large" onClick={handleUpdateHostClick} style={{ margin: '10px' }}>
            Update Host
          </Button>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Trident Host Management ©2024 Created by Your Company
      </Footer>
    </Layout>
  );
};

export default HomePage;
