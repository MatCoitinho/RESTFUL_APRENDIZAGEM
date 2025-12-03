import { useState } from 'react';
import { Card, Typography, Space, Button, Tag, Divider, Alert, Input, InputNumber, Form } from 'antd';
import { PlusOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { mockApi } from '../../services/mockApi';
import { Produto } from '../../types';

const { Title, Paragraph, Text } = Typography;

export const POST = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const novoProduto: Omit<Produto, 'id'> = {
        nome: values.nome,
        descricao: values.descricao || '',
        preco: values.preco,
        categoria: values.categoria || '',
        estoque: values.estoque || 0
      };
      const result = await mockApi.createProduto(novoProduto);
      if ('status' in result && result.status >= 400) {
        setError(result.message || null);
      } else {
        setResponse(result);
        form.resetFields();
      }
    } catch (err) {
      setError('Erro ao criar produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={1}>
            <PlusOutlined /> Método POST
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#666' }}>
            O método POST é usado para <Text strong>criar</Text> novos recursos no servidor. 
            É uma operação que <Text strong>altera o estado</Text> do servidor e não é idempotente, 
            ou seja, executar múltiplas vezes criará múltiplos recursos.
          </Paragraph>
        </div>

        <Divider />

        <Card title="Quando usar POST?">
          <Space direction="vertical">
            <Paragraph>• Para criar novos recursos</Paragraph>
            <Paragraph>• Para enviar dados ao servidor</Paragraph>
            <Paragraph>• Para processar formulários</Paragraph>
            <Paragraph>• Para operações que não são idempotentes</Paragraph>
          </Space>
        </Card>

        <Card title="Como fazer uma requisição POST">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>Criar um novo produto:</Text>
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '16px', 
                borderRadius: '4px',
                marginTop: '8px',
                overflow: 'auto'
              }}>
{`POST /api/produtos
Host: localhost:3000
Content-Type: application/json

{
  "nome": "Mouse Logitech",
  "descricao": "Mouse sem fio",
  "preco": 299.99,
  "categoria": "Periféricos",
  "estoque": 25
}`}
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
{`fetch('http://localhost:3000/api/produtos', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nome: 'Mouse Logitech',
    descricao: 'Mouse sem fio',
    preco: 299.99,
    categoria: 'Periféricos',
    estoque: 25
  })
})
.then(response => response.json())
.then(data => console.log(data));`}
              </pre>
            </div>
          </Space>
        </Card>

        <Card title="Testar Requisição POST">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Nome"
              name="nome"
              rules={[{ required: true, message: 'Nome é obrigatório' }]}
            >
              <Input placeholder="Nome do produto" />
            </Form.Item>

            <Form.Item
              label="Descrição"
              name="descricao"
            >
              <Input.TextArea placeholder="Descrição do produto" rows={3} />
            </Form.Item>

            <Form.Item
              label="Preço"
              name="preco"
              rules={[{ required: true, message: 'Preço é obrigatório' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Preço do produto"
                min={0}
                step={0.01}
              />
            </Form.Item>

            <Form.Item
              label="Categoria"
              name="categoria"
            >
              <Input placeholder="Categoria do produto" />
            </Form.Item>

            <Form.Item
              label="Estoque"
              name="estoque"
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Quantidade em estoque"
                min={0}
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit"
                icon={<PlusOutlined />} 
                loading={loading}
                block
              >
                Criar Produto (POST)
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
              <Tag color="success">201 Created</Tag>
              <Text>Recurso criado com sucesso (retorna o novo recurso)</Text>
            </div>
            <div>
              <Tag color="warning">400 Bad Request</Tag>
              <Text>Dados inválidos ou faltando campos obrigatórios</Text>
            </div>
            <div>
              <Tag color="error">409 Conflict</Tag>
              <Text>Conflito (ex: recurso já existe)</Text>
            </div>
            <div>
              <Tag color="error">500 Internal Server Error</Tag>
              <Text>Erro interno do servidor</Text>
            </div>
          </Space>
        </Card>

        <Card title="Características do POST">
          <Space direction="vertical">
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#1890ff' }} /> <Text strong>Altera estado:</Text> Cria novos recursos no servidor
            </Paragraph>
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#1890ff' }} /> <Text strong>Não idempotente:</Text> Executar múltiplas vezes cria múltiplos recursos
            </Paragraph>
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#1890ff' }} /> <Text strong>Requer corpo:</Text> Deve enviar dados no corpo da requisição
            </Paragraph>
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#1890ff' }} /> <Text strong>Content-Type:</Text> Geralmente usa application/json
            </Paragraph>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

