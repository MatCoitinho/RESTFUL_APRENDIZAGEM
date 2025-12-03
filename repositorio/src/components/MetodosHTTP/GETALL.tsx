import { useState } from 'react';
import { Card, Space, Button, Spin } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { mockApi } from '../../services/mockApi';

export const GETAll = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleGetAll = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const result = await mockApi.getProdutos();
      setResponse(result);
    } catch {
      setResponse({ status: 500, message: 'Erro ao buscar produtos' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Testar GET - Listar todos">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button 
          type="primary" 
          icon={<DownloadOutlined />} 
          onClick={handleGetAll}
          loading={loading}
        >
          GET /api/produtos
        </Button>

        {loading && <Spin size="large" />}

        {response && (
          <Card type="inner" title="Resposta">
            <pre style={{ 
              background: response.status >= 400 ? '#fff1f0' : '#f6ffed',
              padding: '16px', 
              borderRadius: '4px',
              overflow: 'auto',
              maxHeight: '400px'
            }}>
              {JSON.stringify(response, null, 2)}
            </pre>
          </Card>
        )}
      </Space>
    </Card>
  );
};