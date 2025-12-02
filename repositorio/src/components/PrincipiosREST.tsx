import { Card, Typography, Space, Divider, Tag } from 'antd';
import {
  TeamOutlined,
  DatabaseOutlined,
  CloudServerOutlined,
  LinkOutlined,
  ApartmentOutlined,
  CodeOutlined
} from '@ant-design/icons';
import { QuizSection, QuizQuestion } from './QuizSection';

const { Title, Paragraph, Text } = Typography;

const perguntasPrincipios: QuizQuestion[] = [
  {
    pergunta: 'Você está desenvolvendo uma API de e-commerce. Um cliente faz login e depois navega por várias páginas de produtos. Segundo o princípio Stateless, onde as informações de autenticação devem ser enviadas?',
    alternativas: [
      'Apenas na primeira requisição de login, o servidor guarda a sessão',
      'Em todas as requisições, através de um token no header Authorization',
      'Não é necessário enviar em todas as requisições, apenas a cada 5 minutos',
      'Apenas quando o usuário fizer uma compra'
    ],
    correta: 1,
    explicacao: 'No princípio Stateless, cada requisição deve conter todas as informações necessárias. Por isso, o token de autenticação deve ser enviado em TODAS as requisições através do header (ex: Authorization: Bearer token123).'
  },
  {
    pergunta: 'Sua API de produtos retorna uma lista de 1000 itens. Qual header você deve incluir na resposta para permitir que navegadores guardem essa lista por 1 hora?',
    alternativas: [
      'Content-Type: application/json',
      'Cache-Control: max-age=3600',
      'Authorization: Bearer token',
      'Accept: application/json'
    ],
    correta: 1,
    explicacao: 'O header Cache-Control: max-age=3600 instrui o navegador a guardar a resposta por 3600 segundos (1 hora), implementando o princípio Cacheable. Isso reduz requisições desnecessárias ao servidor.'
  },
  {
    pergunta: 'Você tem uma API REST e quer adicionar autenticação sem mudar nada no código dos clientes. Qual princípio REST permite adicionar um gateway de autenticação entre cliente e servidor?',
    alternativas: [
      'Client-Server',
      'Stateless',
      'Layered System',
      'Code on Demand'
    ],
    correta: 2,
    explicacao: 'O princípio Layered System permite adicionar camadas intermediárias (como gateway de autenticação, cache, rate limiting) sem que o cliente precise saber. O cliente continua fazendo as mesmas requisições.'
  },
  {
    pergunta: 'Qual destes exemplos de URL segue o princípio de Uniform Interface (interface uniforme)?',
    alternativas: [
      'POST /api/criarProduto',
      'GET /api/buscarProdutoPorId?id=1',
      'GET /api/produtos/1',
      'GET /api/produto-obter/1'
    ],
    correta: 2,
    explicacao: 'GET /api/produtos/1 segue a convenção REST: usa substantivos (produtos), identificação clara do recurso (/1), e o método HTTP (GET) indica a ação. Evite verbos na URL (criar, buscar, obter).'
  },
  {
    pergunta: 'Você está criando um app mobile e um site que consomem a mesma API de usuários. Qual princípio REST garante que você pode mudar o design do app sem alterar o servidor?',
    alternativas: [
      'Stateless - porque não guarda sessão',
      'Client-Server - porque separa frontend do backend',
      'Cacheable - porque usa cache',
      'Code on Demand - porque envia código'
    ],
    correta: 1,
    explicacao: 'O princípio Client-Server separa as responsabilidades: o cliente (app/site) cuida da interface e o servidor cuida das regras de negócio. Assim, você pode mudar um sem afetar o outro.'
  },
  {
    pergunta: 'Sua API retorna produtos com preços. Você quer que o frontend calcule descontos dinamicamente. Você envia um script JavaScript junto com os dados. Qual princípio você está usando?',
    alternativas: [
      'Uniform Interface',
      'Stateless',
      'Code on Demand',
      'Layered System'
    ],
    correta: 2,
    explicacao: 'Code on Demand (opcional) permite que o servidor envie código executável (JavaScript) para o cliente executar. Isso é útil para lógicas dinâmicas, mas deve ser usado com cuidado por questões de segurança.'
  }
];

const principios = [
  {
    icon: <TeamOutlined />,
    titulo: 'Client-Server',
    descricao: 'Separa responsabilidades entre interface (cliente) e processamento/regras de negócio (servidor). A definição clara de papéis permite evolução independente.',
    impacto: 'Facilita escalabilidade (vários clientes consumindo o mesmo backend), segurança centralizada (autenticação/autorizações no servidor), manutenção mais simples e possibilidade de múltiplos frontends (web, mobile) sobre a mesma API.'
  },
  {
    icon: <DatabaseOutlined />,
    titulo: 'Stateless',
    descricao: 'Cada requisição carrega tudo que é necessário para ser processada. O servidor não guarda contexto de sessão entre chamadas.',
    impacto: 'Permite balanceamento de carga simples (qualquer nó pode atender), melhora resiliência (falha de um nó não quebra sessões), simplifica cache e reduz consumo de memória no servidor. Exige que o cliente gerencie tokens e parâmetros completos, tornando requests mais explícitas.'
  },
  {
    icon: <CloudServerOutlined />,
    titulo: 'Cacheable',
    descricao: 'Respostas devem indicar se podem ou não ser armazenadas (headers como Cache-Control, ETag).',
    impacto: 'Reduz latência e uso de banda, diminui carga no servidor e custos. Aumenta throughput em alta escala. Exige políticas de invalidação/revalidação (ex.: ETag + If-None-Match) para evitar dados obsoletos.'
  },
  {
    icon: <LinkOutlined />,
    titulo: 'Uniform Interface',
    descricao: 'Interface consistente baseada em identificação de recursos (URIs), representações padronizadas (JSON), mensagens auto-descritivas e hypermedia (HATEOAS).',
    impacto: 'Diminui acoplamento, acelera onboarding, facilita testes automatizados e caching intermediário. Padrões claros (GET para leitura, POST para criação) evitam ambiguidade e tornam evolução da API menos arriscada.'
  },
  {
    icon: <ApartmentOutlined />,
    titulo: 'Layered System',
    descricao: 'A arquitetura pode ser organizada em camadas (gateway, cache, balanceador, serviços internos) onde cada camada enxerga apenas a imediatamente adjacente.',
    impacto: 'Permite inserir caching, autenticação, rate limiting, logging e segurança sem alterar clientes ou serviços internos. Melhora escalabilidade e resiliência. Pode adicionar latência se houver camadas excessivas.'
  },
  {
    icon: <CodeOutlined />,
    titulo: 'Code on Demand (Opcional)',
    descricao: 'O servidor pode enviar código executável ao cliente (ex.: scripts) para expandir funcionalidades dinamicamente.',
    impacto: 'Reduz necessidade de deploy imediato no cliente e habilita adaptação dinâmica (validações, renderização). Traz desafios de cache, segurança (execução de código remoto) e depuração. É opcional e deve ser usado com critério.'
  }
];

export const PrincipiosREST = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={1}>Princípios REST</Title>
          <Paragraph style={{ fontSize: '16px', color: '#666' }}>
            REST (Representational State Transfer) é um estilo arquitetural baseado em 6 princípios fundamentais. 
            Entender esses princípios é essencial para criar APIs bem projetadas e escaláveis.
          </Paragraph>
        </div>

        <Divider />

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {principios.map((principio, index) => (
            <Card
              key={index}
              style={{ marginBottom: '16px' }}
              title={
                <Space>
                  {principio.icon}
                  <span>{principio.titulo}</span>
                  {index === principios.length - 1 && (
                    <Tag color="orange">Opcional</Tag>
                  )}
                </Space>
              }
            >
              <Paragraph style={{ fontSize: '15px', lineHeight: '1.8' }}>
                <Text strong>Descrição:</Text> {principio.descricao}
              </Paragraph>
              <Divider style={{ margin: '12px 0' }} />
              <Paragraph style={{ fontSize: '15px', lineHeight: '1.8' }}>
                <Text strong>Impacto na prática:</Text> {principio.impacto}
              </Paragraph>
            </Card>
          ))}
        </Space>

        <Divider />

        <Card type="inner" title="Por que seguir os princípios REST?">
          <Space direction="vertical">
            <Paragraph>
              <Text strong>Escalabilidade:</Text> A arquitetura stateless permite escalar horizontalmente 
              sem problemas de sincronização de estado.
            </Paragraph>
            <Paragraph>
              <Text strong>Simplicidade:</Text> A interface uniforme torna a API fácil de entender e usar.
            </Paragraph>
            <Paragraph>
              <Text strong>Performance:</Text> O cache permite reduzir significativamente a carga no servidor.
            </Paragraph>
            <Paragraph>
              <Text strong>Flexibilidade:</Text> O sistema em camadas permite adicionar novos componentes 
              sem afetar a arquitetura existente.
            </Paragraph>
          </Space>
        </Card>

        <QuizSection
          titulo="Teste seus conhecimentos sobre Princípios REST"
          perguntas={perguntasPrincipios}
          storageKey="quiz-principios-rest"
        />
      </Space>
    </div>
  );
};