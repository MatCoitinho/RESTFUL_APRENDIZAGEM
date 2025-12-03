import { Card, Typography, Space, Tag, Divider } from 'antd';
import { DownloadOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { GETAll } from './GETALL';
import { GETById } from './GETById';

const { Title, Paragraph, Text } = Typography;

export const GET = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={1}>
            <DownloadOutlined /> Método GET
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#666' }}>
            O método GET é usado para <Text strong>buscar</Text> informações de um recurso. 
            É uma operação <Text strong>segura</Text> e <Text strong>idempotente</Text>, 
            ou seja, não altera o estado do servidor e pode ser executada múltiplas vezes 
            sem efeitos colaterais.
          </Paragraph>
        </div>

        <Divider />

        <Card title="Quando usar GET?">
          <Space direction="vertical">
            <Paragraph>• Para buscar/listar recursos</Paragraph>
            <Paragraph>• Para buscar um recurso específico por ID</Paragraph>
            <Paragraph>• Para realizar pesquisas e filtros</Paragraph>
            <Paragraph>• <Text strong>Nunca</Text> use GET para criar, atualizar ou deletar recursos</Paragraph>
          </Space>
        </Card>

        <Card title="Como fazer uma requisição GET">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Text strong>Buscar todos os produtos:</Text>
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '16px', 
                borderRadius: '4px',
                marginTop: '8px',
                overflow: 'auto'
              }}>
{`GET /api/produtos
Host: localhost:3000
Content-Type: application/json`}
              </pre>
            </div>

            <div>
              <Text strong>Buscar produto por ID:</Text>
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '16px', 
                borderRadius: '4px',
                marginTop: '8px',
                overflow: 'auto'
              }}>
{`GET /api/produtos/{id}
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
{`// Buscar todos os produtos
fetch('http://localhost:3000/api/produtos')
  .then(response => response.json())
  .then(data => console.log(data));

// Buscar produto por ID
const id = 1;
fetch(\`http://localhost:3000/api/produtos/\${id}\`)
  .then(response => response.json())
  .then(data => console.log(data));`}
              </pre>
            </div>
          </Space>
        </Card>

        <GETAll />
        <GETById />

        <Card title="Status Codes Comuns">
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Tag color="success">200 OK</Tag>
              <Text>Requisição bem-sucedida, retorna os dados solicitados</Text>
            </div>
            <div>
              <Tag color="error">404 Not Found</Tag>
              <Text>Recurso não encontrado (quando o ID não existe)</Text>
            </div>
            <div>
              <Tag color="warning">400 Bad Request</Tag>
              <Text>Requisição inválida (ex: ID ausente ou inválido)</Text>
            </div>
            <div>
              <Tag color="error">500 Internal Server Error</Tag>
              <Text>Erro interno do servidor</Text>
            </div>
          </Space>
        </Card>

        <Card title="Características do GET">
          <Space direction="vertical">
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#52c41a' }} /> <Text strong>Seguro:</Text> Não altera o estado do servidor
            </Paragraph>
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#52c41a' }} /> <Text strong>Idempotente:</Text> Pode ser executado múltiplas vezes sem efeitos colaterais
            </Paragraph>
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#52c41a' }} /> <Text strong>Cacheável:</Text> Respostas podem ser armazenadas em cache
            </Paragraph>
            <Paragraph>
              <CheckCircleOutlined style={{ color: '#52c41a' }} /> <Text strong>Sem corpo:</Text> Não deve enviar dados no corpo da requisição
            </Paragraph>
          </Space>
        </Card>
      </Space>
    </div>
  );
};