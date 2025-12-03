import { useState } from 'react';
import { Card, Space, Button, Spin, InputNumber, Typography } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { mockApi } from '../../services/mockApi';

const { Text } = Typography;

export const GETById = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<number>(1);

  const handleGetById = async () => {
    setLoading(true);
    setResponse(null);
    try {
      if (!selectedId || selectedId < 1) {
        setResponse({ status: 400, message: 'Informe um ID válido (>= 1)' });
        return;
      }
      const result = await mockApi.getProdutoById(selectedId);
      setResponse(result);
    } catch {
      setResponse({ status: 500, message: 'Erro ao buscar produto' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Testar GET - Buscar por ID">
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space align="center" wrap>
          <Text>ID do produto:</Text>
          <InputNumber
            min={1}
            value={selectedId}
            onChange={(v) => setSelectedId(typeof v === 'number' ? v : 1)}
            placeholder="ID do produto"
            style={{ width: 160 }}
            disabled={loading}
          />
          <Button 
            type="default" 
            icon={<DownloadOutlined />} 
            onClick={handleGetById}
            loading={loading}
          >
            GET /api/produtos/{selectedId}
          </Button>
        </Space>

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