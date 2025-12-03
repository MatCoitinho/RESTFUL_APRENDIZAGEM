import { useState } from 'react';
import { Card, Typography, Space, Button, Tag, Divider, Alert, Input, InputNumber, Form } from 'antd';
import { EditOutlined, CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { mockApi } from '../../services/mockApi';
import { Produto } from '../../types';

const { Title, Paragraph, Text } = Typography;

export const PUT = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const produtoAtualizado: Partial<Produto> = {
        nome: values.nome,
        descricao: values.descricao,
        preco: values.preco,
        categoria: values.categoria,
        estoque: values.estoque
      };
      const result = await mockApi.updateProduto(values.id, produtoAtualizado);
      if ('status' in result && result.status >= 400) {
        setError(result.message || null);
      } else {
        setResponse(result);
        form.resetFields();
      }
    } catch (err) {
      setError('Erro ao atualizar produto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={1}>
            <EditOutlined /> Método PUT
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#666' }}>
            O método PUT é usado para <Text strong>atualizar</Text> um recurso existente ou criar 
            um recurso se ele não existir. É uma operação <Text strong>idempotente</Text>, 
            ou seja, executar múltiplas vezes terá o mesmo efeito.
          </Paragraph>
        </div>

        <Divider />

        <Card title="Quando usar PUT?">
          <Space direction="vertical">
            <Paragraph>• Para atualizar um recurso existente completamente</Paragraph>
            <Paragraph>• Para substituir todo o conteúdo de um recurso</Paragraph>
            <Paragraph>• Para criar um recurso se ele não existir (upsert)</Paragraph>
            <Paragraph>• Quando você quer garantir idempotência</Paragraph>
          </Space>
        </Card>

        <Card title="Diferença entre PUT e PATCH">
          <Space direction="vertical">
            <Paragraph>
              <Text strong>PUT:</Text> Atualiza o recurso completamente, substituindo todos os campos. 
              É idempotente.
            </Paragraph>
            <Paragraph>
              <Text strong>PATCH:</Text> Atualiza apenas os campos especificados (atualização parcial). 
              Também pode ser idempotente, mas não necessariamente.
            </Paragraph>
          </Space>
        </Card>

        <Card title="Como fazer uma requisição PUT">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>Atualizar um produto existente:</Text>
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '16px', 
                borderRadius: '4px',
                marginTop: '8px',
                overflow: 'auto'
              }}>
{`PUT /api/produtos/1
Host: localhost:3000
Content-Type: application/json

{
  "nome": "Notebook Dell Atualizado",
  "descricao": "Notebook Dell Inspiron 15 - Nova versão",
  "preco": 3299.99,
  "categoria": "Eletrônicos",
  "estoque": 8
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
{`fetch('http://localhost:3000/api/produtos/1', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    nome: 'Notebook Dell Atualizado',
    descricao: 'Notebook Dell Inspiron 15 - Nova versão',
    preco: 3299.99,
    categoria: 'Eletrônicos',
    estoque: 8
  })
})
.then(response => response.json())
.then(data => console.log(data));`}
              </pre>
            </div>
          </Space>
        </Card>

        <Card title="Testar Requisição PUT">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ id: 1 }}
          >
            <Form.Item
              label="ID do Produto"
              name="id"
              rules={[{ required: true, message: 'ID é obrigatório' }]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="ID do produto a atualizar"
                min={1}
              />
            </Form.Item>

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
                icon={<EditOutlined />} 
                loading={loading}
                block
              >
                Atualizar Produto (PUT)
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
              <Text>Recurso atualizado com sucesso (retorna o recurso atualizado)</Text>
            </div>
            <div>
              <Tag color="success">201 Created</Tag>
              <Text>Recurso criado (se não existia antes)</Text>
            </div>
            <div>
              <Tag color="error">404 Not Found</Tag>
              <Text>Recurso não encontrado (se não permite criar via PUT)</Text>
            </div>
            <div>
              <Tag color="warning">400 Bad Request</Tag>
              <Text>Dados inválidos ou faltando campos obrigatórios</Text>
            </div>
            <div>
              <Tag color="error">500 Internal Server Error</Tag>
              <Text>Erro interno do servidor</Text>
            </div>
          </Space>
        </Card>

        <Card title="Características do PUT">
          <Space direction="vertical">
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#fa8c16' }} /> <Text strong>Altera estado:</Text> Atualiza recursos no servidor
            </Paragraph>
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#fa8c16' }} /> <Text strong>Idempotente:</Text> Executar múltiplas vezes tem o mesmo efeito
            </Paragraph>
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#fa8c16' }} /> <Text strong>Requer corpo:</Text> Deve enviar dados completos no corpo da requisição
            </Paragraph>
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#fa8c16' }} /> <Text strong>Substitui completamente:</Text> Todos os campos são atualizados
            </Paragraph>
          </Space>
        </Card>
      </Space>
    </div>
  );
};

