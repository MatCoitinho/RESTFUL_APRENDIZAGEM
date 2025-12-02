import { Card, Typography, Space, Divider, Tag } from 'antd';
import { ApiOutlined, FileTextOutlined, LinkOutlined } from '@ant-design/icons';
import { QuizSection, QuizQuestion } from './QuizSection';

const { Title, Paragraph, Text } = Typography;

const perguntasEndpoints: QuizQuestion[] = [
  {
    pergunta: 'Você precisa buscar apenas produtos da categoria "Eletrônicos" que custam menos de R$ 1000. Qual endpoint está correto?',
    alternativas: [
      'GET /api/produtos?categoria=Eletrônicos&preco_max=1000',
      'POST /api/produtos/buscar com body: {"categoria": "Eletrônicos", "preco": 1000}',
      'GET /api/produtos/categoria/Eletrônicos/preco/1000',
      'GET /api/buscarProdutosPorCategoriaEPreco'
    ],
    correta: 0,
    explicacao: 'Use query parameters (?chave=valor) para filtros e buscas com GET. Exemplo: /produtos?categoria=Eletrônicos&preco_max=1000. Isso mantém a URL limpa e permite múltiplos filtros.'
  },
  {
    pergunta: 'Observe este JSON de resposta. Qual tipo de dado é o campo "disponivel"?\n\n{ "id": 1, "nome": "Mouse", "preco": 49.90, "disponivel": true }',
    alternativas: [
      'String',
      'Number',
      'Boolean',
      'Object'
    ],
    correta: 2,
    explicacao: 'O campo "disponivel": true é do tipo Boolean. Em JSON, valores booleanos são representados como true ou false (sem aspas). Strings teriam aspas: "true".'
  },
  {
    pergunta: 'Você está criando uma API de blog. Qual estrutura de endpoint está mais adequada para buscar comentários de um post específico?',
    alternativas: [
      'GET /api/comentarios?post_id=5',
      'GET /api/posts/5/comentarios',
      'GET /api/buscar-comentarios-do-post/5',
      'POST /api/posts com body: {"id": 5, "buscar": "comentarios"}'
    ],
    correta: 1,
    explicacao: 'Use URLs hierárquicas para relacionamentos: /posts/5/comentarios mostra claramente que são os comentários DO post 5. Isso torna a API mais intuitiva e RESTful.'
  },
  {
    pergunta: 'Sua API retornou erro 404. Qual corpo JSON está melhor estruturado para ajudar o desenvolvedor a entender o problema?',
    alternativas: [
      '{ "erro": "não achei" }',
      '{ "status": 404, "message": "Produto com ID 999 não encontrado", "timestamp": "2024-01-15T10:30:00Z" }',
      '{ "error": true }',
      '404'
    ],
    correta: 1,
    explicacao: 'Boas respostas de erro incluem: status code, mensagem clara, detalhes úteis (qual recurso não foi encontrado) e timestamp. Isso facilita debugging e melhora a experiência do desenvolvedor.'
  },
  {
    pergunta: 'Você quer enviar um produto com múltiplas imagens. Qual estrutura JSON está correta?',
    alternativas: [
      '{ "nome": "Notebook", "imagens": "img1.jpg, img2.jpg, img3.jpg" }',
      '{ "nome": "Notebook", "imagens": ["img1.jpg", "img2.jpg", "img3.jpg"] }',
      '{ "nome": "Notebook", "imagem1": "img1.jpg", "imagem2": "img2.jpg" }',
      '{ "nome": "Notebook", "imagens": {"1": "img1.jpg", "2": "img2.jpg"} }'
    ],
    correta: 1,
    explicacao: 'Use Arrays [ ] para listas de valores em JSON. Exemplo: "imagens": ["img1.jpg", "img2.jpg"]. Isso facilita iterar sobre os valores e é mais limpo que concatenar strings ou criar múltiplos campos.'
  },
  {
    pergunta: 'Observe estas URLs. Qual NÃO está seguindo as boas práticas REST?',
    alternativas: [
      'GET /api/usuarios/123/pedidos',
      'POST /api/produtos',
      'GET /api/getProdutos',
      'DELETE /api/produtos/456'
    ],
    correta: 2,
    explicacao: 'Evite verbos nas URLs REST! Use GET /api/produtos em vez de /api/getProdutos. O método HTTP (GET, POST, DELETE) já indica a ação. URLs devem ter apenas substantivos que representam recursos.'
  }
];

export const EndpointsEstrutura = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={1}>
            <ApiOutlined /> Endpoints e Estrutura de Dados
          </Title>
          <Paragraph style={{ fontSize: '16px', color: '#666' }}>
            Entenda como estruturar endpoints RESTful e como trabalhar com dados em formato JSON
          </Paragraph>
        </div>

        <Divider />

        <Card title={<><LinkOutlined /> O que são Endpoints?</>}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Paragraph>
              Endpoints são os pontos de acesso de uma API REST. Cada endpoint representa um recurso 
              e pode ser acessado através de uma URL (URI) específica. Os endpoints seguem uma estrutura 
              hierárquica que reflete a organização dos recursos.
            </Paragraph>
            
            <Card type="inner" title="Estrutura de um Endpoint">
              <Space direction="vertical">
                <Paragraph>
                  <Text code>http://localhost:3000/api/produtos</Text>
                </Paragraph>
                <Paragraph>
                  <Text strong>Protocolo:</Text> http ou https
                </Paragraph>
                <Paragraph>
                  <Text strong>Host:</Text> localhost:3000 (domínio e porta)
                </Paragraph>
                <Paragraph>
                  <Text strong>Path:</Text> /api/produtos (caminho do recurso)
                </Paragraph>
              </Space>
            </Card>

            <Card type="inner" title="Exemplos de Endpoints para API de Produtos">
              <Space direction="vertical" style={{ width: '100%' }}>
                <div>
                  <Text strong>Listar todos os produtos:</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Text code>GET /api/produtos</Text>
                  </div>
                </div>
                <div>
                  <Text strong>Buscar produto específico:</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Text code>GET /api/produtos/1</Text>
                  </div>
                </div>
                <div>
                  <Text strong>Criar novo produto:</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Text code>POST /api/produtos</Text>
                  </div>
                </div>
                <div>
                  <Text strong>Atualizar produto:</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Text code>PUT /api/produtos/1</Text>
                  </div>
                </div>
                <div>
                  <Text strong>Deletar produto:</Text>
                  <div style={{ marginTop: '8px' }}>
                    <Text code>DELETE /api/produtos/1</Text>
                  </div>
                </div>
              </Space>
            </Card>
          </Space>
        </Card>

        <Card title={<><FileTextOutlined /> Estrutura JSON</>}>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Paragraph>
              JSON (JavaScript Object Notation) é o formato padrão para troca de dados em APIs REST. 
              É um formato leve, legível e fácil de processar tanto por humanos quanto por máquinas.
            </Paragraph>

            <Card type="inner" title="Estrutura Básica de um Produto em JSON">
              <pre style={{ 
                background: '#f5f5f5', 
                padding: '16px', 
                borderRadius: '4px',
                overflow: 'auto'
              }}>
{`{
  "id": 1,
  "nome": "Notebook Dell",
  "descricao": "Notebook Dell Inspiron 15",
  "preco": 2999.99,
  "categoria": "Eletrônicos",
  "estoque": 10
}`}
              </pre>
            </Card>

            <Card type="inner" title="Tipos de Dados no JSON">
              <Space direction="vertical">
                <Paragraph>
                  <Tag color="blue">String</Tag> - Texto entre aspas: <Text code>"nome": "Produto"</Text>
                </Paragraph>
                <Paragraph>
                  <Tag color="green">Number</Tag> - Números: <Text code>"preco": 2999.99</Text>
                </Paragraph>
                <Paragraph>
                  <Tag color="orange">Boolean</Tag> - Verdadeiro ou falso: <Text code>"ativo": true</Text>
                </Paragraph>
                <Paragraph>
                  <Tag color="purple">Array</Tag> - Lista de valores: <Text code>"tags": ["eletrônico", "notebook"]</Text>
                </Paragraph>
                <Paragraph>
                  <Tag color="red">Object</Tag> - Objeto aninhado: <Text code>"fornecedor": {"{"} "nome": "Dell" {"}"}</Text>
                </Paragraph>
                <Paragraph>
                  <Tag>Null</Tag> - Valor nulo: <Text code>"descricao": null</Text>
                </Paragraph>
              </Space>
            </Card>

            <Card type="inner" title="Exemplo de Resposta da API">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Paragraph>
                  <Text strong>Resposta de sucesso (200 OK):</Text>
                </Paragraph>
                <pre style={{ 
                  background: '#f5f5f5', 
                  padding: '16px', 
                  borderRadius: '4px',
                  overflow: 'auto'
                }}>
{`{
  "data": {
    "id": 1,
    "nome": "Notebook Dell",
    "descricao": "Notebook Dell Inspiron 15",
    "preco": 2999.99,
    "categoria": "Eletrônicos",
    "estoque": 10
  },
  "status": 200
}`}
                </pre>

                <Paragraph style={{ marginTop: '16px' }}>
                  <Text strong>Resposta de erro (404 Not Found):</Text>
                </Paragraph>
                <pre style={{ 
                  background: '#fff1f0', 
                  padding: '16px', 
                  borderRadius: '4px',
                  overflow: 'auto'
                }}>
{`{
  "status": 404,
  "message": "Produto não encontrado"
}`}
                </pre>
              </Space>
            </Card>

            <Card type="inner" title="Boas Práticas">
              <Space direction="vertical">
                <Paragraph>
                  <Text strong>✓</Text> Use nomes descritivos e consistentes para os campos
                </Paragraph>
                <Paragraph>
                  <Text strong>✓</Text> Siga o padrão camelCase ou snake_case consistentemente
                </Paragraph>
                <Paragraph>
                  <Text strong>✓</Text> Sempre inclua informações de status na resposta
                </Paragraph>
                <Paragraph>
                  <Text strong>✓</Text> Use códigos de status HTTP apropriados
                </Paragraph>
                <Paragraph>
                  <Text strong>✓</Text> Mantenha a estrutura de resposta consistente
                </Paragraph>
                <Paragraph>
                  <Text strong>✓</Text> Documente seus endpoints e estruturas de dados
                </Paragraph>
              </Space>
            </Card>
          </Space>
        </Card>

        <QuizSection
          titulo="Teste seus conhecimentos sobre Endpoints e Estrutura"
          perguntas={perguntasEndpoints}
          storageKey="quiz-endpoints"
        />
      </Space>
    </div>
  );
};