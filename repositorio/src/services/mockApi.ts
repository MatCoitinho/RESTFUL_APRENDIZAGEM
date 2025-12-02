import { Produto, ApiResponse, ApiError } from '../types';

let produtos: Produto[] = [
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

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async getProdutos(): Promise<ApiResponse<Produto[]>> {
    await delay(500);
    return {
      data: produtos,
      status: 200
    };
  },

  async getProdutoById(id: number): Promise<ApiResponse<Produto> | ApiError> {
    await delay(300);
    const produto = produtos.find(p => p.id === id);
    
    if (!produto) {
      return {
        status: 404,
        message: 'Produto não encontrado'
      };
    }

    return {
      data: produto,
      status: 200
    };
  },

  async createProduto(produto: Omit<Produto, 'id'>): Promise<ApiResponse<Produto> | ApiError> {
    await delay(600);
    
    if (!produto.nome || !produto.preco) {
      return {
        status: 400,
        message: 'Dados inválidos',
        errors: ['Nome e preço são obrigatórios']
      };
    }

    const novoProduto: Produto = {
      ...produto,
      id: nextId++
    };

    produtos.push(novoProduto);

    return {
      data: novoProduto,
      status: 201,
      message: 'Produto criado com sucesso'
    };
  },

  async updateProduto(id: number, produto: Partial<Produto>): Promise<ApiResponse<Produto> | ApiError> {
    await delay(500);
    
    const index = produtos.findIndex(p => p.id === id);
    
    if (index === -1) {
      return {
        status: 404,
        message: 'Produto não encontrado'
      };
    }

    produtos[index] = {
      ...produtos[index],
      ...produto
    };

    return {
      data: produtos[index],
      status: 200,
      message: 'Produto atualizado com sucesso'
    };
  },

  async deleteProduto(id: number): Promise<ApiResponse<null> | ApiError> {
    await delay(400);
    
    const index = produtos.findIndex(p => p.id === id);
    
    if (index === -1) {
      return {
        status: 404,
        message: 'Produto não encontrado'
      };
    }

    produtos.splice(index, 1);

    return {
      data: null,
      status: 200,
      message: 'Produto deletado com sucesso'
    };
  }
};

