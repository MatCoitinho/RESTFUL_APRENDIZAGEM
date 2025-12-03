import { useState } from 'react';
import { Card, Typography, Space, Menu, MenuProps } from 'antd';
import {
  DownloadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { GET } from './MetodosHTTP/GET';
import { POST } from './MetodosHTTP/POST';
import { PUT } from './MetodosHTTP/PUT';
import { DELETE } from './MetodosHTTP/DELETE';
import { QuizSection, QuizQuestion } from './QuizSection';

const { Title, Paragraph } = Typography;

const perguntasHTTP: QuizQuestion[] = [
  {
    pergunta: 'Você quer cadastrar um novo usuário no sistema. Qual método HTTP e qual corpo (body) você deve usar?',
    alternativas: [
      'GET /api/usuarios - sem body',
      'POST /api/usuarios - body: { "nome": "João", "email": "joao@email.com" }',
      'PUT /api/usuarios - body: { "nome": "João" }',
      'DELETE /api/usuarios - body: { "id": 1 }'
    ],
    correta: 1,
    explicacao: 'POST é usado para CRIAR novos recursos. Você envia os dados do novo usuário no body em formato JSON. A URL identifica a coleção (/usuarios) e o servidor gera o ID automaticamente.'
  },
  {
    pergunta: 'Você executou POST /api/produtos três vezes com os mesmos dados. O que acontece?',
    alternativas: [
      'Cria apenas 1 produto',
      'Cria 3 produtos diferentes',
      'Retorna erro "produto já existe"',
      'Atualiza o mesmo produto 3 vezes'
    ],
    correta: 1,
    explicacao: 'POST NÃO é idempotente! Cada execução cria um novo recurso, mesmo com dados idênticos. Por isso, executar 3 vezes cria 3 produtos. Diferente do PUT que sempre atualiza o mesmo recurso.'
  },
  {
    pergunta: 'Você precisa atualizar APENAS o preço de um produto (de R$100 para R$150), mantendo nome e descrição. Qual requisição está correta?',
    alternativas: [
      'PUT /api/produtos/1 - body: { "preco": 150 }',
      'PUT /api/produtos/1 - body: { "nome": "Mouse", "descricao": "Mouse sem fio", "preco": 150 }',
      'PATCH /api/produtos/1 - body: { "preco": 150 }',
      'POST /api/produtos/atualizar - body: { "id": 1, "preco": 150 }'
    ],
    correta: 2,
    explicacao: 'PATCH é ideal para atualização parcial (só o preço). PUT exige enviar TODOS os campos do recurso. Embora neste curso focamos em PUT, PATCH é mais eficiente quando quer mudar apenas alguns campos.'
  },
  {
    pergunta: 'Você deletou um produto com DELETE /api/produtos/5 e recebeu status 200. Se executar DELETE /api/produtos/5 novamente, o que deve acontecer?',
    alternativas: [
      'Retorna status 200 novamente',
      'Retorna status 404 Not Found',
      'Retorna erro 500 Internal Server Error',
      'Recria o produto automaticamente'
    ],
    correta: 0,
    explicacao: 'DELETE é idempotente! Executar múltiplas vezes deve ter o mesmo efeito. Geralmente retorna 200/204 na primeira vez e 404 nas seguintes (produto não existe mais). Ambos indicam que o produto não está mais lá, cumprindo a idempotência.'
  },
  {
    pergunta: 'Qual método HTTP você NÃO deve usar para buscar/visualizar dados, porque ele altera o estado do servidor?',
    alternativas: [
      'GET',
      'POST',
      'OPTIONS',
      'HEAD'
    ],
    correta: 1,
    explicacao: 'POST altera o estado do servidor (cria recursos). Use GET para buscar dados - é seguro e não altera nada. OPTIONS e HEAD também são seguros: OPTIONS retorna métodos permitidos, HEAD retorna só headers (sem body).'
  },
  {
    pergunta: 'Sua API criou um produto com sucesso. Qual status code e resposta são mais apropriados?',
    alternativas: [
      '200 OK - body: { "message": "Sucesso" }',
      '201 Created - body: { "id": 4, "nome": "Teclado", "preco": 299.90 }',
      '204 No Content - sem body',
      '202 Accepted - body: { "processando": true }'
    ],
    correta: 1,
    explicacao: '201 Created indica que um recurso foi criado com sucesso. É boa prática retornar o recurso criado completo (incluindo o ID gerado) no body. Assim o cliente não precisa fazer outra requisição GET para buscar os dados.'
  }
];

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: 'get',
    icon: <DownloadOutlined />,
    label: 'GET',
  },
  {
    key: 'post',
    icon: <PlusOutlined />,
    label: 'POST',
  },
  {
    key: 'put',
    icon: <EditOutlined />,
    label: 'PUT',
  },
  {
    key: 'delete',
    icon: <DeleteOutlined />,
    label: 'DELETE',
  },
];

export const ProtocoloHTTP = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>('get');

  const handleMenuClick = (e: { key: string }) => {
    setSelectedMethod(e.key);
  };

  const renderMethodContent = () => {
    switch (selectedMethod) {
      case 'get':
        return <GET />;
      case 'post':
        return <POST />;
      case 'put':
        return <PUT />;
      case 'delete':
        return <DELETE />;
      default:
        return <GET />;
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={1}>Protocolo HTTP</Title>
          <Paragraph style={{ fontSize: '16px', color: '#666' }}>
            O Protocolo HTTP (HyperText Transfer Protocol) é o protocolo de comunicação usado para 
            transferir dados na web. Entenda os métodos HTTP principais e como usá-los em APIs RESTful.
          </Paragraph>
        </div>

        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={3}>O que é HTTP?</Title>
              <Paragraph>
                HTTP é um protocolo de comunicação cliente-servidor que permite a transferência de 
                dados na web. Ele define como mensagens são formatadas e transmitidas, e como servidores 
                e navegadores respondem a vários comandos.
              </Paragraph>
            </div>

            <div>
              <Title level={3}>Métodos HTTP Principais</Title>
              <Paragraph>
                Os métodos HTTP (também chamados de verbos) indicam a ação que deve ser realizada 
                no recurso identificado. Os quatro métodos mais comuns em APIs RESTful são:
              </Paragraph>
              <Space direction="vertical" style={{ marginTop: '16px' }}>
                <Paragraph>
                  <strong>GET:</strong> Buscar/ler dados (operações de leitura)
                </Paragraph>
                <Paragraph>
                  <strong>POST:</strong> Criar novos recursos (operações de criação)
                </Paragraph>
                <Paragraph>
                  <strong>PUT:</strong> Atualizar recursos existentes completamente (operações de atualização)
                </Paragraph>
                <Paragraph>
                  <strong>DELETE:</strong> Remover recursos (operações de exclusão)
                </Paragraph>
              </Space>
            </div>

            <div style={{ marginTop: '24px' }}>
              <Title level={3}>Selecione um Método para Explorar</Title>
              <Menu
                mode="horizontal"
                selectedKeys={[selectedMethod]}
                items={items}
                onClick={handleMenuClick}
                style={{ marginBottom: '24px' }}
              />
            </div>
          </Space>
        </Card>

        <div style={{ minHeight: '400px' }}>
          {renderMethodContent()}
        </div>

        <QuizSection
          titulo="Teste seus conhecimentos sobre Protocolo HTTP"
          perguntas={perguntasHTTP}
          storageKey="quiz-http"
        />
      </Space>
    </div>
  );
};