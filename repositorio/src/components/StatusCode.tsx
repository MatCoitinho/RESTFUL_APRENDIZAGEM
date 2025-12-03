import { Card, Typography, Space, Divider, Tag, Table } from 'antd';
import {
  CheckCircleOutlined,
  InfoCircleOutlined,
  WarningOutlined,
  CloseCircleOutlined,
  SyncOutlined
} from '@ant-design/icons';
import { QuizSection, QuizQuestion } from './QuizSection';

const { Title, Paragraph, Text } = Typography;

const perguntasStatusCodes: QuizQuestion[] = [
  {
    pergunta: 'Você criou um novo usuário com sucesso na API. Qual status code é mais apropriado retornar?',
    alternativas: [
      '200 OK',
      '201 Created',
      '204 No Content',
      '202 Accepted'
    ],
    correta: 1,
    explicacao: '201 Created indica que um novo recurso foi criado com sucesso. É mais específico que 200 OK e comunica claramente que algo novo foi adicionado ao servidor.'
  },
  {
    pergunta: 'Um cliente tenta acessar GET /api/admin/usuarios mas não tem permissão de administrador. Qual status code você deve retornar?',
    alternativas: [
      '401 Unauthorized',
      '403 Forbidden',
      '404 Not Found',
      '400 Bad Request'
    ],
    correta: 1,
    explicacao: '403 Forbidden indica que o servidor entendeu a requisição, mas o cliente não tem permissão para acessar o recurso. Use 401 quando não está autenticado e 403 quando está autenticado mas não autorizado.'
  },
  {
    pergunta: 'Você deletou um produto com sucesso e não há conteúdo para retornar. Qual status code é ideal?',
    alternativas: [
      '200 OK',
      '201 Created',
      '204 No Content',
      '404 Not Found'
    ],
    correta: 2,
    explicacao: '204 No Content indica sucesso mas sem corpo na resposta. É perfeito para DELETE ou PUT quando não há necessidade de retornar dados. Economiza banda e deixa claro que a operação foi concluída.'
  },
  {
    pergunta: 'Um cliente envia POST /api/produtos com JSON inválido (falta vírgula, sintaxe errada). Qual status code retornar?',
    alternativas: [
      '400 Bad Request',
      '422 Unprocessable Entity',
      '500 Internal Server Error',
      '415 Unsupported Media Type'
    ],
    correta: 0,
    explicacao: '400 Bad Request indica que a requisição está malformada (JSON inválido, sintaxe errada). Use 422 quando o JSON é válido mas os dados não fazem sentido (ex: email="abc", idade=-5).'
  },
  {
    pergunta: 'Sua API de pagamento recebeu a requisição mas o processamento vai demorar 30 segundos. Qual status code retornar imediatamente?',
    alternativas: [
      '200 OK',
      '201 Created',
      '202 Accepted',
      '204 No Content'
    ],
    correta: 2,
    explicacao: '202 Accepted indica que a requisição foi aceita para processamento, mas ainda não foi concluída. Útil para operações assíncronas. O cliente pode verificar o status depois via polling ou webhooks.'
  },
  {
    pergunta: 'Um cliente faz GET /api/produtos/999 mas esse ID não existe no banco. Qual status code você retorna?',
    alternativas: [
      '400 Bad Request',
      '404 Not Found',
      '500 Internal Server Error',
      '204 No Content'
    ],
    correta: 1,
    explicacao: '404 Not Found indica que o recurso solicitado não existe. O servidor está funcionando, a sintaxe está correta, mas o ID específico não foi encontrado no banco de dados.'
  }
];

const statusCodes2xx = [
  { code: '200', name: 'OK', description: 'Requisição bem-sucedida (GET, PUT, PATCH)', color: 'success' },
  { code: '201', name: 'Created', description: 'Recurso criado com sucesso (POST)', color: 'success' },
  { code: '202', name: 'Accepted', description: 'Requisição aceita, processamento assíncrono', color: 'success' },
  { code: '204', name: 'No Content', description: 'Sucesso sem conteúdo na resposta (DELETE)', color: 'success' },
];

const statusCodes3xx = [
  { code: '301', name: 'Moved Permanently', description: 'Recurso movido permanentemente para nova URL', color: 'processing' },
  { code: '302', name: 'Found', description: 'Redirecionamento temporário', color: 'processing' },
  { code: '304', name: 'Not Modified', description: 'Recurso não modificado, use cache', color: 'processing' },
];

const statusCodes4xx = [
  { code: '400', name: 'Bad Request', description: 'Requisição malformada (JSON inválido, sintaxe errada)', color: 'warning' },
  { code: '401', name: 'Unauthorized', description: 'Não autenticado (falta token, token inválido)', color: 'warning' },
  { code: '403', name: 'Forbidden', description: 'Autenticado mas sem permissão', color: 'warning' },
  { code: '404', name: 'Not Found', description: 'Recurso não encontrado', color: 'warning' },
  { code: '405', name: 'Method Not Allowed', description: 'Método HTTP não permitido neste endpoint', color: 'warning' },
  { code: '409', name: 'Conflict', description: 'Conflito (email já existe, violação de constraint)', color: 'warning' },
  { code: '422', name: 'Unprocessable Entity', description: 'JSON válido mas dados inválidos (regras de negócio)', color: 'warning' },
  { code: '429', name: 'Too Many Requests', description: 'Rate limit excedido', color: 'warning' },
];

const statusCodes5xx = [
  { code: '500', name: 'Internal Server Error', description: 'Erro genérico do servidor', color: 'error' },
  { code: '502', name: 'Bad Gateway', description: 'Gateway recebeu resposta inválida', color: 'error' },
  { code: '503', name: 'Service Unavailable', description: 'Servidor temporariamente indisponível (manutenção)', color: 'error' },
  { code: '504', name: 'Gateway Timeout', description: 'Gateway não recebeu resposta a tempo', color: 'error' },
];

const columns = [
  {
    title: 'Código',
    dataIndex: 'code',
    key: 'code',
    render: (code: string, record: any) => (
      <Tag color={record.color} style={{ fontSize: '14px', fontWeight: 'bold' }}>
        {code}
      </Tag>
    ),
  },
  {
    title: 'Nome',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <Text strong>{text}</Text>,
  },
  {
    title: 'Descrição',
    dataIndex: 'description',
    key: 'description',
  },
];

export const StatusCodes = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={1}>Status Codes HTTP</Title>
          <Paragraph style={{ fontSize: '16px', color: '#666' }}>
            Entenda os códigos de status HTTP e quando usar cada um. Status codes comunicam o resultado 
            de uma requisição de forma padronizada.
          </Paragraph>
        </div>

        <Divider />

        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Title level={3}>O que são Status Codes?</Title>
            <Paragraph>
              Status codes HTTP são códigos numéricos de 3 dígitos que o servidor retorna para indicar 
              o resultado de uma requisição. Eles são divididos em 5 categorias:
            </Paragraph>
            <Space direction="vertical" style={{ marginTop: '16px' }}>
              <Paragraph>
                <CheckCircleOutlined style={{ color: '#52c41a' }} /> <Text strong>2xx (Sucesso):</Text> Requisição foi recebida, compreendida e aceita
              </Paragraph>
              <Paragraph>
                <InfoCircleOutlined style={{ color: '#1890ff' }} /> <Text strong>3xx (Redirecionamento):</Text> Ação adicional necessária para completar a requisição
              </Paragraph>
              <Paragraph>
                <WarningOutlined style={{ color: '#faad14' }} /> <Text strong>4xx (Erro do Cliente):</Text> Requisição contém sintaxe incorreta ou não pode ser atendida
              </Paragraph>
              <Paragraph>
                <CloseCircleOutlined style={{ color: '#ff4d4f' }} /> <Text strong>5xx (Erro do Servidor):</Text> Servidor falhou ao processar requisição aparentemente válida
              </Paragraph>
            </Space>
          </Space>
        </Card>

        <Card title={<><CheckCircleOutlined style={{ color: '#52c41a' }} /> 2xx - Sucesso</>}>
          <Table
            dataSource={statusCodes2xx}
            columns={columns}
            pagination={false}
            rowKey="code"
          />
          <Divider />
          <Card type="inner" title="Exemplo de uso">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Criar produto (201 Created):</Text>
              <pre style={{ 
                background: '#f6ffed', 
                padding: '16px', 
                borderRadius: '4px',
                overflow: 'auto'
              }}>
{`POST /api/produtos
Response: 201 Created
{
  "data": {
    "id": 4,
    "nome": "Mouse Gamer",
    "preco": 199.90
  },
  "message": "Produto criado com sucesso"
}`}
              </pre>
            </Space>
          </Card>
        </Card>

        <Card title={<><SyncOutlined style={{ color: '#1890ff' }} /> 3xx - Redirecionamento</>}>
          <Table
            dataSource={statusCodes3xx}
            columns={columns}
            pagination={false}
            rowKey="code"
          />
          <Divider />
          <Card type="inner" title="Exemplo de uso">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>Cache com ETag (304 Not Modified):</Text>
              <pre style={{ 
                background: '#e6f7ff', 
                padding: '16px', 
                borderRadius: '4px',
                overflow: 'auto'
              }}>
{`GET /api/produtos/1
Headers: If-None-Match: "abc123"

Response: 304 Not Modified
(Sem corpo - cliente usa cache local)`}
              </pre>
            </Space>
          </Card>
        </Card>

        <Card title={<><WarningOutlined style={{ color: '#faad14' }} /> 4xx - Erro do Cliente</>}>
          <Table
            dataSource={statusCodes4xx}
            columns={columns}
            pagination={false}
            rowKey="code"
          />
          <Divider />
          <Card type="inner" title="Exemplos de uso">
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div>
                <Text strong>400 Bad Request (JSON inválido):</Text>
                <pre style={{ 
                  background: '#fff7e6', 
                  padding: '16px', 
                  borderRadius: '4px',
                  overflow: 'auto'
                }}>
{`POST /api/produtos
Body: { nome: "Mouse" preco: 99 } // Falta vírgula

Response: 400 Bad Request
{
  "status": 400,
  "message": "JSON malformado",
  "error": "Unexpected token p in JSON"
}`}
                </pre>
              </div>

              <div>
                <Text strong>422 Unprocessable Entity (dados inválidos):</Text>
                <pre style={{ 
                  background: '#fff7e6', 
                  padding: '16px', 
                  borderRadius: '4px',
                  overflow: 'auto'
                }}>
{`POST /api/produtos
Body: { "nome": "", "preco": -10 } // JSON válido, dados inválidos

Response: 422 Unprocessable Entity
{
  "status": 422,
  "message": "Dados inválidos",
  "errors": [
    "Nome é obrigatório",
    "Preço deve ser maior que 0"
  ]
}`}
                </pre>
              </div>
            </Space>
          </Card>
        </Card>

        <Card title={<><CloseCircleOutlined style={{ color: '#ff4d4f' }} /> 5xx - Erro do Servidor</>}>
          <Table
            dataSource={statusCodes5xx}
            columns={columns}
            pagination={false}
            rowKey="code"
          />
          <Divider />
          <Card type="inner" title="Exemplo de uso">
            <Space direction="vertical" style={{ width: '100%' }}>
              <Text strong>500 Internal Server Error:</Text>
              <pre style={{ 
                background: '#fff1f0', 
                padding: '16px', 
                borderRadius: '4px',
                overflow: 'auto'
              }}>
{`GET /api/produtos
Response: 500 Internal Server Error
{
  "status": 500,
  "message": "Erro interno do servidor",
  "timestamp": "2024-01-15T10:30:00Z"
}`}
              </pre>
              <Paragraph style={{ marginTop: '8px', color: '#666' }}>
                <Text strong>Importante:</Text> Nunca exponha detalhes técnicos (stack trace, queries SQL) 
                em produção por questões de segurança.
              </Paragraph>
            </Space>
          </Card>
        </Card>

        <Card title="Diferenças Importantes">
          <Space direction="vertical" size="middle">
            <div>
              <Text strong>400 vs 422:</Text>
              <Paragraph>
                • <Text code>400 Bad Request</Text>: Requisição malformada (JSON inválido, sintaxe errada)<br />
                • <Text code>422 Unprocessable Entity</Text>: JSON válido mas dados não atendem regras de negócio
              </Paragraph>
            </div>
            <div>
              <Text strong>401 vs 403:</Text>
              <Paragraph>
                • <Text code>401 Unauthorized</Text>: Não autenticado (precisa fazer login, token ausente/inválido)<br />
                • <Text code>403 Forbidden</Text>: Autenticado mas sem permissão para acessar o recurso
              </Paragraph>
            </div>
            <div>
              <Text strong>200 vs 201 vs 204:</Text>
              <Paragraph>
                • <Text code>200 OK</Text>: Sucesso genérico (GET, PUT, PATCH)<br />
                • <Text code>201 Created</Text>: Recurso criado (POST)<br />
                • <Text code>204 No Content</Text>: Sucesso sem corpo na resposta (DELETE)
              </Paragraph>
            </div>
          </Space>
        </Card>

        <QuizSection
          titulo="Teste seus conhecimentos sobre Status Codes"
          perguntas={perguntasStatusCodes}
          storageKey="quiz-status-codes"
        />
      </Space>
    </div>
  );
};