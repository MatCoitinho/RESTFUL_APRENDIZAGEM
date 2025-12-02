import { Card, Typography, Space, Divider } from 'antd';
import { ApiOutlined, BookOutlined, RocketOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

export const Home = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={1}>
            <ApiOutlined /> Bem-vindo ao Guia de APIs RESTful
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#666' }}>
            Aprenda os conceitos fundamentais de APIs RESTful de forma prática e interativa
          </Paragraph>
        </div>

        <Divider />

        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Card>
            <Space direction="vertical" size="middle">
              <Title level={3}>
                <BookOutlined /> Sobre este Projeto
              </Title>
              <Paragraph>
                Este projeto foi criado para ensinar os conceitos fundamentais de APIs RESTful de forma 
                didática e prática. Aqui você encontrará explicações detalhadas sobre os princípios REST, 
                estrutura de endpoints, protocolo HTTP e seus métodos principais.
              </Paragraph>
            </Space>
          </Card>

          <Card>
            <Space direction="vertical" size="middle">
              <Title level={3}>
                <RocketOutlined /> O que você vai aprender
              </Title>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Paragraph>
                  <strong>Princípios REST:</strong> Entenda os 6 princípios fundamentais que definem 
                  uma arquitetura RESTful, incluindo Client-Server, Stateless, Cacheable, Uniform Interface, 
                  Layered System e Code on Demand.
                </Paragraph>
                <Paragraph>
                  <strong>Endpoints e Estrutura de Dados:</strong> Aprenda como estruturar endpoints 
                  RESTful, entender a estrutura JSON e como organizar dados em suas APIs.
                </Paragraph>
                <Paragraph>
                  <strong>Protocolo HTTP:</strong> Explore os métodos HTTP principais (GET, POST, PUT, DELETE), 
                  entenda quando usar cada um, veja exemplos práticos e aprenda sobre os códigos de status 
                  HTTP e seus significados.
                </Paragraph>
              </Space>
            </Space>
          </Card>

          <Card>
            <Space direction="vertical" size="middle">
              <Title level={3}>Como usar</Title>
              <Paragraph>
                Use o menu lateral para navegar entre as diferentes seções. Cada seção contém explicações 
                detalhadas e exemplos práticos que você pode testar diretamente no navegador.
              </Paragraph>
              <Paragraph>
                <strong>Dica:</strong> Experimente os exemplos de requisições HTTP na seção de Protocolo HTTP 
                para ver como cada método funciona na prática!
              </Paragraph>
            </Space>
          </Card>
        </Space>
      </Space>
    </div>
  );
};

