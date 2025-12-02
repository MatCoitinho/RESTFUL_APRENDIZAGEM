# Guia de APIs RESTful

Projeto educacional em React com Ant Design para ensinar conceitos fundamentais de APIs RESTful.

## Tecnologias

- React 18
- TypeScript
- Ant Design 5
- Vite

## Pré-requisitos

- Node.js >= 18.0.0
- npm >= 8.0.0

## Instalação

1. Instale as dependências:
```bash
npm install
```

2. Execute o projeto em modo desenvolvimento:
```bash
npm run dev
```

3. Acesse no navegador:
```
http://localhost:5173
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm run preview` - Preview do build de produção

## Conteúdo

O projeto apresenta:

1. **Home**: Tela de boas-vindas com introdução ao projeto
2. **Princípios REST**: Explicação dos 6 princípios fundamentais REST
3. **Endpoints e Estrutura**: Explicação sobre endpoints, estrutura JSON e exemplos
4. **Protocolo HTTP**: Métodos HTTP (GET, POST, PUT, DELETE) com exemplos práticos

## Funcionalidades

- Menu lateral colapsável
- Navegação por seções sem recarregar página
- Exemplos interativos de requisições HTTP mock
- Demonstração de status codes HTTP
- Layout responsivo com Ant Design

## Estrutura do Projeto

```
src/
├── components/
│   ├── Home.tsx
│   ├── PrincipiosREST.tsx
│   ├── EndpointsEstrutura.tsx
│   ├── ProtocoloHTTP.tsx
│   └── MetodosHTTP/
│       ├── GET.tsx
│       ├── POST.tsx
│       ├── PUT.tsx
│       └── DELETE.tsx
├── services/
│   └── mockApi.ts
├── types/
│   └── index.ts
├── App.tsx
└── index.tsx
```

## Aprendizado

Este projeto é uma ferramenta educacional para entender:
- Princípios da arquitetura REST
- Como estruturar endpoints RESTful
- Métodos HTTP e quando usá-los
- Status codes e suas aplicações
- Estrutura de dados JSON

## Público Alvo
- Estudantes de graduação/técnicos em TI iniciando em desenvolvimento web.
- Desenvolvedores iniciantes que querem entender REST, HTTP e status codes.
- Profissionais de backend/QA migrando para APIs RESTful ou validando endpoints.
- Times que precisam de onboarding rápido sobre boas práticas de APIs.

Pré-requisitos recomendados:
- Noções básicas de JavaScript/TypeScript e Node.js (npm).
- Conceitos introdutórios de HTTP (métodos, códigos de status).
- Conhecimento básico de React é desejável, mas não obrigatório.

Nível: Iniciante a Intermediário.

## Mapa Conceitual do Objeto de Aprendizagem
Grupo 22 - Cmap

## State Chart do Objeto de Aprendizagem
https://excalidraw.com/#json=V2Her0qJG_ayD_cCAizU7,kXMMYxDSgmmu9IZTXTGzCw
