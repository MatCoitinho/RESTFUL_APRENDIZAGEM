import React, { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  HomeOutlined,
  BookOutlined,
  ApiOutlined,
  GlobalOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleOutlined,
  SwapOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

import { Home } from './components/Home';
import { PrincipiosREST } from './components/PrincipiosREST';
import { EndpointsEstrutura } from './components/EndpointsEstrutura';
import { ProtocoloHTTP } from './components/ProtocoloHTTP';
import { StatusCodes } from './components/StatusCode';
import { ComparacaoArquiteturas } from './components/ComparacaoRest';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const menuItems: MenuItem[] = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: 'Home',
  },
  {
    key: 'principios',
    icon: <BookOutlined />,
    label: 'Princípios REST',
  },
  {
    key: 'endpoints',
    icon: <ApiOutlined />,
    label: 'Endpoints e Estrutura',
  },
  {
    key: 'status-codes',
    icon: <CheckCircleOutlined />,
    label: 'Status Codes',
  },
  {
    key: 'http',
    icon: <GlobalOutlined />,
    label: 'Protocolo HTTP',
  },
  {
    key: 'comparacao',
    icon: <SwapOutlined />,
    label: 'Comparação Arquiteturas',
  }
];

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string>('home');

  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case 'home':
        return <Home />;
      case 'principios':
        return <PrincipiosREST />;
      case 'endpoints':
        return <EndpointsEstrutura />;
      case 'http':
        return <ProtocoloHTTP />;
      case 'status-codes':
        return <StatusCodes />;
      case 'comparacao':
        return <ComparacaoArquiteturas />;
      default:
        return <Home />;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div style={{ 
          height: 64, 
          margin: 16, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          {!collapsed ? 'REST API Guide' : 'REST'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'margin-left 0.2s' }}>
        <Header style={{ 
          padding: '0 24px', 
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
            style: { fontSize: '18px', cursor: 'pointer' }
          })}
          <Title level={4} style={{ margin: '0 0 0 16px', fontWeight: 'normal' }}>
            Guia de APIs RESTful
          </Title>
        </Header>
        <Content style={{ 
          margin: '24px 16px', 
          padding: 24, 
          background: '#fff',
          minHeight: 280,
        }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;