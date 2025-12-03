import { Card, Typography, Space, Divider, Table, Tag, Collapse } from 'antd';
import {
  ApiOutlined,
  ThunderboltOutlined,
  FileTextOutlined,
  RocketOutlined
} from '@ant-design/icons';
import { QuizSection, QuizQuestion } from './QuizSection';

const { Title, Paragraph, Text } = Typography;
const { Panel } = Collapse;

const perguntasComparacao: QuizQuestion[] = [
  {
    pergunta: 'Você está desenvolvendo um app mobile de e-commerce com conectividade instável. Qual arquitetura é mais adequada?',
    alternativas: [
      'SOAP - porque é mais robusto',
      'REST - porque funciona com HTTP e permite cache',
      'GraphQL - porque permite queries complexas',
      'gRPC - porque é mais rápido'
    ],
    correta: 1,
    explicacao: 'REST é ideal para mobile com conectividade instável porque funciona sobre HTTP padrão, suporta cache nativamente e é stateless.'
  },
  {
    pergunta: 'Seu frontend precisa buscar um usuário E seus últimos 10 posts E comentários desses posts. Como resolver isso eficientemente?',
    alternativas: [
      'REST: 3 requisições separadas',
      'GraphQL: 1 query pedindo exatamente esses dados aninhados',
      'SOAP: 1 operação getFullUserData',
      'gRPC: 3 chamadas RPC em paralelo'
    ],
    correta: 1,
    explicacao: 'GraphQL resolve o problema de under-fetching! Em 1 query você pede exatamente o que precisa, economizando banda e reduzindo latência.'
  },
  {
    pergunta: 'Você precisa integrar com um sistema bancário legado que exige contratos rígidos e WS-Security. Qual escolher?',
    alternativas: [
      'REST',
      'GraphQL',
      'SOAP',
      'gRPC'
    ],
    correta: 2,
    explicacao: 'SOAP é ideal para sistemas enterprise/legados porque oferece contratos rígidos (WSDL), WS-Security nativo e suporte a transações ACID.'
  },
  {
    pergunta: 'Você está construindo microserviços com comunicação interna de alta performance. Qual escolher?',
    alternativas: [
      'REST JSON',
      'GraphQL',
      'SOAP XML',
      'gRPC'
    ],
    correta: 3,
    explicacao: 'gRPC é ideal para microserviços por usar HTTP/2, Protocol Buffers (binário 5-10x menor que JSON) e ter streaming bidirecional.'
  }
];

const comparacaoData = [
  {
    key: '1',
    aspecto: 'Protocolo',
    rest: 'HTTP/HTTPS',
    graphql: 'HTTP/HTTPS',
    soap: 'HTTP, SMTP, TCP',
    grpc: 'HTTP/2',
  },
  {
    key: '2',
    aspecto: 'Formato',
    rest: 'JSON, XML',
    graphql: 'JSON',
    soap: 'XML',
    grpc: 'Protocol Buffers',
  },
  {
    key: '3',
    aspecto: 'Performance',
    rest: 'Boa',
    graphql: 'Boa',
    soap: 'Lenta',
    grpc: 'Muito rápida',
  },
  {
    key: '4',
    aspecto: 'Complexidade',
    rest: 'Simples',
    graphql: 'Média',
    soap: 'Alta',
    grpc: 'Média-Alta',
  },
  {
    key: '5',
    aspecto: 'Cache',
    rest: 'Nativo',
    graphql: 'Complexo',
    soap: 'Não nativo',
    grpc: 'Não nativo',
  },
];

const columns = [
  {
    title: 'Aspecto',
    dataIndex: 'aspecto',
    key: 'aspecto',
    render: (text: string) => <Text strong>{text}</Text>,
    fixed: 'left' as const,
    width: 120,
  },
  {
    title: 'REST',
    dataIndex: 'rest',
    key: 'rest',
    width: 150,
  },
  {
    title: 'GraphQL',
    dataIndex: 'graphql',
    key: 'graphql',
    width: 150,
  },
  {
    title: 'SOAP',
    dataIndex: 'soap',
    key: 'soap',
    width: 150,
  },
  {
    title: 'gRPC',
    dataIndex: 'grpc',
    key: 'grpc',
    width: 150,
  },
];

export const ComparacaoArquiteturas = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={1}>
            <ApiOutlined /> Comparação de Arquiteturas
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#666' }}>
            Entenda as diferenças entre REST, GraphQL, SOAP e gRPC de forma simplificada.
          </Paragraph>
        </div>

        <Divider />

        <Card title="Comparação Rápida">
          <Table
            dataSource={comparacaoData}
            columns={columns}
            pagination={false}
            scroll={{ x: 600 }}
          />
        </Card>

        <Card title="Quando usar cada uma?">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div>
              <Tag color="blue" style={{ fontSize: '14px' }}>REST</Tag>
              <Paragraph style={{ marginTop: '8px' }}>
                ✅ APIs públicas simples<br />
                ✅ CRUD básico<br />
                ✅ Cache importante<br />
                ✅ Equipe prefere simplicidade
              </Paragraph>
            </div>

            <Divider style={{ margin: '12px 0' }} />

            <div>
              <Tag color="purple" style={{ fontSize: '14px' }}>GraphQL</Tag>
              <Paragraph style={{ marginTop: '8px' }}>
                ✅ Frontend complexo com dados aninhados<br />
                ✅ Apps mobile (economia de dados)<br />
                ✅ Múltiplos clientes com necessidades diferentes<br />
                ✅ Reduzir número de requisições
              </Paragraph>
            </div>

            <Divider style={{ margin: '12px 0' }} />

            <div>
              <Tag color="orange" style={{ fontSize: '14px' }}>SOAP</Tag>
              <Paragraph style={{ marginTop: '8px' }}>
                ✅ Sistemas bancários/governamentais<br />
                ✅ Precisa de WS-Security<br />
                ✅ Transações ACID complexas<br />
                ✅ Contratos rígidos obrigatórios
              </Paragraph>
            </div>

            <Divider style={{ margin: '12px 0' }} />

            <div>
              <Tag color="green" style={{ fontSize: '14px' }}>gRPC</Tag>
              <Paragraph style={{ marginTop: '8px' }}>
                ✅ Microserviços (comunicação interna)<br />
                ✅ Performance crítica (baixa latência)<br />
                ✅ Streaming de dados<br />
                ✅ Comunicação entre várias linguagens
              </Paragraph>
            </div>
          </Space>
        </Card>

        <Collapse accordion>
          <Panel 
            header={
              <span>
                <ApiOutlined style={{ marginRight: '8px' }} />
                <Text strong>REST - Detalhes</Text>
              </span>
            } 
            key="rest"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Paragraph>
                <Text strong>Vantagens:</Text><br />
                • Simples e fácil de aprender<br />
                • Cache HTTP nativo<br />
                • Ferramentas maduras (Postman, Swagger)
              </Paragraph>
              <Paragraph>
                <Text strong>Desvantagens:</Text><br />
                • Pode retornar dados desnecessários (over-fetching)<br />
                • Pode exigir múltiplas requisições (under-fetching)
              </Paragraph>
              <Card type="inner" size="small" title="Exemplo">
                <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
{`GET /api/users/123
Response:
{
  "id": 123,
  "name": "João",
  "email": "joao@email.com"
}`}
                </pre>
              </Card>
            </Space>
          </Panel>

          <Panel 
            header={
              <span>
                <ThunderboltOutlined style={{ marginRight: '8px' }} />
                <Text strong>GraphQL - Detalhes</Text>
              </span>
            } 
            key="graphql"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Paragraph>
                <Text strong>Vantagens:</Text><br />
                • Cliente pede exatamente o que precisa<br />
                • 1 query para dados aninhados<br />
                • Documentação automática
              </Paragraph>
              <Paragraph>
                <Text strong>Desvantagens:</Text><br />
                • Curva de aprendizado maior<br />
                • Cache mais complexo<br />
                • Pode sobrecarregar servidor
              </Paragraph>
              <Card type="inner" size="small" title="Exemplo">
                <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
{`query {
  user(id: 123) {
    name
    posts { title }
  }
}`}
                </pre>
              </Card>
            </Space>
          </Panel>

          <Panel 
            header={
              <span>
                <FileTextOutlined style={{ marginRight: '8px' }} />
                <Text strong>SOAP - Detalhes</Text>
              </span>
            } 
            key="soap"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Paragraph>
                <Text strong>Vantagens:</Text><br />
                • Contratos formais (WSDL)<br />
                • WS-Security robusto<br />
                • Suporte a transações
              </Paragraph>
              <Paragraph>
                <Text strong>Desvantagens:</Text><br />
                • XML verboso (maior payload)<br />
                • Complexo de implementar<br />
                • Performance inferior
              </Paragraph>
              <Card type="inner" size="small" title="Exemplo">
                <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
{`<soap:Envelope>
  <soap:Body>
    <GetUser>
      <UserId>123</UserId>
    </GetUser>
  </soap:Body>
</soap:Envelope>`}
                </pre>
              </Card>
            </Space>
          </Panel>

          <Panel 
            header={
              <span>
                <RocketOutlined style={{ marginRight: '8px' }} />
                <Text strong>gRPC - Detalhes</Text>
              </span>
            } 
            key="grpc"
          >
            <Space direction="vertical" style={{ width: '100%' }}>
              <Paragraph>
                <Text strong>Vantagens:</Text><br />
                • Muito rápido (HTTP/2 + binário)<br />
                • Payload 5-10x menor que JSON<br />
                • Streaming nativo
              </Paragraph>
              <Paragraph>
                <Text strong>Desvantagens:</Text><br />
                • Não legível por humanos (binário)<br />
                • Suporte limitado em navegadores<br />
                • Curva de aprendizado
              </Paragraph>
              <Card type="inner" size="small" title="Exemplo">
                <pre style={{ background: '#f5f5f5', padding: '12px', borderRadius: '4px', overflow: 'auto' }}>
{`service UserService {
  rpc GetUser(UserRequest) 
    returns (UserResponse);
}`}
                </pre>
              </Card>
            </Space>
          </Panel>
        </Collapse>

        <QuizSection
          titulo="Teste seus conhecimentos sobre Arquiteturas"
          perguntas={perguntasComparacao}
          storageKey="quiz-comparacao"
        />
      </Space>
    </div>
  );
};