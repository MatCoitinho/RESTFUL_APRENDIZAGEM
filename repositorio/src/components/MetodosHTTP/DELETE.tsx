import { useState } from 'react';
import { Card, Typography, Space, Button, Tag, Divider, Alert, InputNumber, Form } from 'antd';
import { DeleteOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { mockApi } from '../../services/mockApi';

const { Title, Paragraph, Text } = Typography;

export const DELETE = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const result = await mockApi.deleteProduto(values.id);
      if ('status' in result && result.status >= 400) {
        setError(result.message || null);
      } else {
        setResponse(result);
        form.resetFields();
      }
    } catch (err) {
      setError('Erro ao deletar produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={1}>
            <DeleteOutlined /> Método DELETE
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#666' }}>
            O método DELETE é usado para <Text strong>remover</Text> um recurso do servidor. 
            É uma operação que <Text strong>altera o estado</Text> do servidor e é <Text strong>idempotente</Text>, 
            ou seja, deletar um recurso que já foi deletado não causa erro.
          </Paragraph>
        </div>

        <Divider />

        <Card title="Quando usar DELETE?">
          <Space direction="vertical">
            <Paragraph>• Para remover recursos específicos</Paragraph>
            <Paragraph>• Para deletar dados do servidor</Paragraph>
            <Paragraph>• Para operações de exclusão permanente</Paragraph>
            <Paragraph>• <Text strong>Atenção:</Text> DELETE é uma operação destrutiva e geralmente irreversível</Paragraph>
          </Space>
        </Card>

        <Card title="Como fazer uma requisição DELETE">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>Deletar um produto:</Text>
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '16px', 
                borderRadius: '4px',
                marginTop: '8px',
                overflow: 'auto'
              }}>
{`DELETE /api/produtos/1
Host: localhost:3000
Content-Type: application/json`}
              </pre>
            </div>

            <div>
              <Text strong>Exemplo com fetch (JavaScript):</Text>
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '16px', 
                borderRadius: '4px',
                marginTop: '8px',
                overflow: 'auto'
              }}>
{`fetch('http://localhost:3000/api/produtos/1', {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
              </pre>
            </div>

            <Alert
              message="Importante"
              description="DELETE geralmente não requer corpo na requisição. O ID do recurso é especificado na URL."
              type="warning"
              showIcon
              style={{ marginTop: '16px' }}
            />
          </Space>
        </Card>

        <Card title="Testar Requisição DELETE">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="ID do Produto a Deletar"
              name="id"
              rules={[{ required: true, message: 'ID é obrigatório' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="ID do produto a deletar"
                min={1}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                danger
                htmlType="submit"
                icon={<DeleteOutlined />} 
                loading={loading}
                block
              >
                Deletar Produto (DELETE)
              </Button>
            </Form.Item>
          </Form>

          {error && (
            <Alert
              message="Erro"
              description={error}
              type="error"
              icon={<CloseCircleOutlined />}
              showIcon
              style={{ marginTop: '16px' }}
            />
          )}

          {response && (
            <Card type="inner" title="Resposta" style={{ marginTop: '16px' }}>
              <pre style={{ 
                background: '#f6ffed', 
                padding: '16px', 
                borderRadius: '4px',
                overflow: 'auto',
                maxHeight: '400px'
              }}>
                {JSON.stringify(response, null, 2)}
              </pre>
            </Card>
          )}
        </Card>

        <Card title="Status Codes Comuns">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Tag color="success">200 OK</Tag>
              <Text>Recurso deletado com sucesso (retorna confirmação)</Text>
            </div>
            <div>
              <Tag color="success">204 No Content</Tag>
              <Text>Recurso deletado com sucesso (sem corpo na resposta)</Text>
            </div>
            <div>
              <Tag color="error">404 Not Found</Tag>
              <Text>Recurso não encontrado (já foi deletado ou nunca existiu)</Text>
            </div>
            <div>
              <Tag color="warning">403 Forbidden</Tag>
              <Text>Sem permissão para deletar o recurso</Text>
            </div>
            <div>
              <Tag color="error">500 Internal Server Error</Tag>
              <Text>Erro interno do servidor</Text>
            </div>
          </Space>
        </Card>

        <Card title="Características do DELETE">
          <Space direction="vertical">
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#ff4d4f' }} /> <Text strong>Altera estado:</Text> Remove recursos do servidor
            </Paragraph>
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#ff4d4f' }} /> <Text strong>Idempotente:</Text> Deletar um recurso já deletado não causa erro
            </Paragraph>
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#ff4d4f' }} /> <Text strong>Sem corpo:</Text> Geralmente não requer dados no corpo da requisição
            </Paragraph>
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#ff4d4f' }} /> <Text strong>Destrutivo:</Text> Operação geralmente irreversível
            </Paragraph>
          </Space>
        </Card>

        <Card title="Boas Práticas">
          <Space direction="vertical">
            <Paragraph>
              <Text strong>✓</Text> Sempre confirme antes de deletar recursos importantes
            </Paragraph>
            <Paragraph>
              <Text strong>✓</Text> Considere implementar soft delete (marcar como deletado) em vez de deletar permanentemente
            </Paragraph>
            <Paragraph>
              <Text strong>✓</Text> Verifique permissões antes de permitir exclusão
            </Paragraph>
            <Paragraph>
              <Text strong>✓</Text> Retorne 204 No Content se não houver conteúdo na resposta
            </Paragraph>
            <Paragraph>
              <Text strong>✓</Text> Considere efeitos em cascata (deletar recursos relacionados)
            </Paragraph>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

