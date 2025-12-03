import { useState, useEffect } from 'react';
import { Card, Typography, Space, Button, Table, Modal, Form, Input, InputNumber, message, Tag, Divider } from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { Produto } from '../types';

const { Title, Paragraph, Text } = Typography;

// Mock API local (simula backend)
let produtosStorage: Produto[] = [
  {
    id: 1,
    nome: 'Notebook Dell',
    descricao: 'Notebook Dell Inspiron 15',
    preco: 2999.99,
    categoria: 'Eletrônicos',
    estoque: 10
  },
  {
    id: 2,
    nome: 'Mouse Logitech',
    descricao: 'Mouse sem fio Logitech MX Master',
    preco: 299.99,
    categoria: 'Periféricos',
    estoque: 25
  },
  {
    id: 3,
    nome: 'Teclado Mecânico',
    descricao: 'Teclado mecânico RGB',
    preco: 499.99,
    categoria: 'Periféricos',
    estoque: 15
  }
];
let nextId = 4;

type OperationType = 'create' | 'read' | 'update' | 'delete';

interface HistoricoItem {
  timestamp: string;
  metodo: string;
  endpoint: string;
  status: number;
  descricao: string;
}

export const CRUDPratico = () => {
  const [form] = Form.useForm();
  const [produtos, setProdutos] = useState<Produto[]>(produtosStorage);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<OperationType>('create');
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);

  useEffect(() => {
    produtosStorage = produtos;
  }, [produtos]);

  const addHistorico = (metodo: string, endpoint: string, status: number, descricao: string) => {
    const item: HistoricoItem = {
      timestamp: new Date().toLocaleTimeString(),
      metodo,
      endpoint,
      status,
      descricao
    };
    setHistorico(prev => [item, ...prev].slice(0, 10)); // Mantém últimas 10
  };

  // CREATE
  const handleCreate = () => {
    setModalType('create');
    setSelectedProduto(null);
    form.resetFields();
    setModalVisible(true);
  };

  const submitCreate = async (values: any) => {
    const novoProduto: Produto = {
      ...values,
      id: nextId++
    };
    setProdutos([...produtos, novoProduto]);
    addHistorico('POST', '/api/produtos', 201, `Produto "${novoProduto.nome}" criado`);
    message.success('Produto criado com sucesso!');
    setModalVisible(false);
  };

  // READ (individual)
  const handleRead = (produto: Produto) => {
    setModalType('read');
    setSelectedProduto(produto);
    setModalVisible(true);
    addHistorico('GET', `/api/produtos/${produto.id}`, 200, `Produto "${produto.nome}" visualizado`);
  };

  // UPDATE
  const handleUpdate = (produto: Produto) => {
    setModalType('update');
    setSelectedProduto(produto);
    form.setFieldsValue(produto);
    setModalVisible(true);
  };

  const submitUpdate = async (values: any) => {
    if (!selectedProduto) return;
    
    const produtosAtualizados = produtos.map(p =>
      p.id === selectedProduto.id ? { ...p, ...values } : p
    );
    setProdutos(produtosAtualizados);
    addHistorico('PUT', `/api/produtos/${selectedProduto.id}`, 200, `Produto "${values.nome}" atualizado`);
    message.success('Produto atualizado com sucesso!');
    setModalVisible(false);
  };

  // DELETE
  const handleDelete = (produto: Produto) => {
    Modal.confirm({
      title: 'Confirmar exclusão',
      content: `Tem certeza que deseja deletar "${produto.nome}"?`,
      okText: 'Sim, deletar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: () => {
        setProdutos(produtos.filter(p => p.id !== produto.id));
        addHistorico('DELETE', `/api/produtos/${produto.id}`, 200, `Produto "${produto.nome}" deletado`);
        message.success('Produto deletado com sucesso!');
      },
    });
  };

  // RESET
  const handleReset = () => {
    produtosStorage = [
      {
        id: 1,
        nome: 'Notebook Dell',
        descricao: 'Notebook Dell Inspiron 15',
        preco: 2999.99,
        categoria: 'Eletrônicos',
        estoque: 10
      },
      {
        id: 2,
        nome: 'Mouse Logitech',
        descricao: 'Mouse sem fio Logitech MX Master',
        preco: 299.99,
        categoria: 'Periféricos',
        estoque: 25
      },
      {
        id: 3,
        nome: 'Teclado Mecânico',
        descricao: 'Teclado mecânico RGB',
        preco: 499.99,
        categoria: 'Periféricos',
        estoque: 15
      }
    ];
    nextId = 4;
    setProdutos([...produtosStorage]);
    setHistorico([]);
    message.info('Dados resetados para o estado inicial');
  };

  const columns: ColumnsType<Produto> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 70,
    },
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Preço',
      dataIndex: 'preco',
      key: 'preco',
      render: (preco: number) => `R$ ${preco.toFixed(2)}`,
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',
    },
    {
      title: 'Estoque',
      dataIndex: 'estoque',
      key: 'estoque',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleRead(record)}
          >
            Ver
          </Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleUpdate(record)}
          >
            Editar
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Deletar
          </Button>
        </Space>
      ),
    },
  ];

  const historicoColumns: ColumnsType<HistoricoItem> = [
    {
      title: 'Hora',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 100,
    },
    {
      title: 'Método',
      dataIndex: 'metodo',
      key: 'metodo',
      width: 80,
      render: (metodo: string) => {
        const colors: Record<string, string> = {
          GET: 'blue',
          POST: 'green',
          PUT: 'orange',
          DELETE: 'red'
        };
        return <Tag color={colors[metodo]}>{metodo}</Tag>;
      },
    },
    {
      title: 'Endpoint',
      dataIndex: 'endpoint',
      key: 'endpoint',
      render: (text: string) => <Text code>{text}</Text>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: number) => (
        <Tag color={status < 300 ? 'success' : 'error'}>{status}</Tag>
      ),
    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Title level={1}>CRUD Completo - Exercício Prático</Title>
          <Paragraph style={{ fontSize: '16px', color: '#666' }}>
            Pratique as operações CRUD (Create, Read, Update, Delete) em um ambiente interativo. 
            Todas as operações são simuladas localmente.
          </Paragraph>
        </div>

        <Divider />

        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Title level={3}>O que você vai praticar</Title>
            <Space direction="vertical">
              <Paragraph>
                <CheckCircleOutlined style={{ color: '#52c41a' }} /> <Text strong>CREATE (POST):</Text> Adicionar novos produtos
              </Paragraph>
              <Paragraph>
                <CheckCircleOutlined style={{ color: '#1890ff' }} /> <Text strong>READ (GET):</Text> Visualizar lista e detalhes de produtos
              </Paragraph>
              <Paragraph>
                <CheckCircleOutlined style={{ color: '#fa8c16' }} /> <Text strong>UPDATE (PUT):</Text> Atualizar informações de produtos
              </Paragraph>
              <Paragraph>
                <CheckCircleOutlined style={{ color: '#ff4d4f' }} /> <Text strong>DELETE:</Text> Remover produtos
              </Paragraph>
            </Space>
          </Space>
        </Card>

        <Card
          title={`Lista de Produtos (${produtos.length} itens)`}
          extra={
            <Space>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleCreate}
              >
                Novo Produto
              </Button>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleReset}
              >
                Resetar Dados
              </Button>
            </Space>
          }
        >
          <Table
            dataSource={produtos}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </Card>

        <Card title="Histórico de Requisições">
          {historico.length === 0 ? (
            <Paragraph style={{ textAlign: 'center', color: '#999' }}>
              Nenhuma requisição realizada ainda. Experimente criar, editar ou deletar produtos!
            </Paragraph>
          ) : (
            <Table
              dataSource={historico}
              columns={historicoColumns}
              rowKey="timestamp"
              pagination={false}
              size="small"
            />
          )}
        </Card>

        <Card title="Dicas">
          <Space direction="vertical">
            <Paragraph>
              • <Text strong>Experimente todas as operações:</Text> Crie produtos, visualize detalhes, 
              edite informações e delete itens
            </Paragraph>
            <Paragraph>
              • <Text strong>Observe o histórico:</Text> Acompanhe cada requisição HTTP sendo simulada 
              com método, endpoint e status code
            </Paragraph>
            <Paragraph>
              • <Text strong>Teste validações:</Text> Tente criar produtos sem nome ou com preço negativo 
              para ver as validações em ação
            </Paragraph>
            <Paragraph>
              • <Text strong>Use o reset:</Text> Volte ao estado inicial quando quiser começar de novo
            </Paragraph>
          </Space>
        </Card>
      </Space>

      {/* Modal para CREATE/UPDATE/READ */}
      <Modal
        title={
          modalType === 'create' ? 'Criar Novo Produto' :
          modalType === 'update' ? 'Atualizar Produto' :
          'Detalhes do Produto'
        }
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={
          modalType === 'read' ? (
            <Button onClick={() => setModalVisible(false)}>Fechar</Button>
          ) : (
            <>
              <Button onClick={() => setModalVisible(false)}>Cancelar</Button>
              <Button
                type="primary"
                onClick={() => form.submit()}
              >
                {modalType === 'create' ? 'Criar' : 'Atualizar'}
              </Button>
            </>
          )
        }
      >
        {modalType === 'read' && selectedProduto ? (
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Text strong>ID:</Text> <Text>{selectedProduto.id}</Text>
            </div>
            <div>
              <Text strong>Nome:</Text> <Text>{selectedProduto.nome}</Text>
            </div>
            <div>
              <Text strong>Descrição:</Text> <Text>{selectedProduto.descricao}</Text>
            </div>
            <div>
              <Text strong>Preço:</Text> <Text>R$ {selectedProduto.preco.toFixed(2)}</Text>
            </div>
            <div>
              <Text strong>Categoria:</Text> <Text>{selectedProduto.categoria}</Text>
            </div>
            <div>
              <Text strong>Estoque:</Text> <Text>{selectedProduto.estoque} unidades</Text>
            </div>
          </Space>
        ) : (
          <Form
            form={form}
            layout="vertical"
            onFinish={modalType === 'create' ? submitCreate : submitUpdate}
          >
            <Form.Item
              label="Nome"
              name="nome"
              rules={[
                { required: true, message: 'Nome é obrigatório' },
                { min: 3, message: 'Nome deve ter no mínimo 3 caracteres' }
              ]}
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
              rules={[
                { required: true, message: 'Preço é obrigatório' },
                { type: 'number', min: 0.01, message: 'Preço deve ser maior que 0' }
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Preço do produto"
                min={0}
                step={0.01}
                prefix="R$"
              />
            </Form.Item>

            <Form.Item
              label="Categoria"
              name="categoria"
              rules={[{ required: true, message: 'Categoria é obrigatória' }]}
            >
              <Input placeholder="Categoria do produto" />
            </Form.Item>

            <Form.Item
              label="Estoque"
              name="estoque"
              rules={[
                { required: true, message: 'Estoque é obrigatório' },
                { type: 'number', min: 0, message: 'Estoque não pode ser negativo' }
              ]}
            >
              <InputNumber
                style={{ width: '100%' }}
                placeholder="Quantidade em estoque"
                min={0}
              />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </div>
  );
};