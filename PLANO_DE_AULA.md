# **PLANO DE AULA**

**Tema:** APIs RESTful – Princípios, HTTP e CRUD
**Disciplina:** Desenvolvimento Web Back-End
**Curso:** Ciência da Computação
**Carga Horária:** 100 min
**Professores:** Matheus Coitinho, João Victor Bonilha
**Data:** 05/12/2025

---

## **1. PRÉ-REQUISITOS**

* Programação básica (estruturas, lógica, JSON).
* Conceitos de redes (HTTP, URLs, cliente-servidor).
* Noções de CRUD e banco de dados (desejável).
* Conteúdos prévios: arquitetura web, HTTP, APIs.

---

## **2. OBJETIVOS**

### **Lembrar**

* Definir API REST, métodos HTTP, status codes e estrutura de endpoints.

### **Compreender / Aplicar**

* Comparar REST, SOAP, GraphQL e gRPC.
* Aplicar princípios REST (stateless, cache, interface uniforme).
* Usar corretamente métodos HTTP em operações CRUD.
* Interpretar requisições e respostas JSON.

### **Criar**

* Projetar uma API RESTful completa.
* Estruturar endpoints versionados e hierárquicos.
* Formular respostas de erro e boas práticas de design.

### **Competências e Habilidades**

* Entendimento do estilo REST.
* Implementação de CRUD com métodos adequados.
* Análise de códigos de status e documentação de API.

---

## **3. DESENVOLVIMENTO DO TEMA**

### **3.1 Conceitos Principais**

* REST como estilo arquitetural criado por Fielding.
* 6 princípios: Client-Server, Stateless, Cacheable, Uniform Interface, Layered System, Code on Demand (opcional).
* Diferenças entre REST, SOAP, GraphQL e gRPC.

### **3.2 Endpoints REST**

* Substantivos, plural, hierarquia, query params.
* Anatomia de URL: domínio / versão / recurso / id / sub-recurso.
* Versionamento via `/v1`.

### **3.3 JSON em APIs**

* Estrutura de requisições POST/PUT.
* Respostas padronizadas com `id`, timestamps, erros estruturados.

### **3.4 Métodos HTTP e CRUD**

* GET (leitura, seguro, idempotente)
* POST (criação, não idempotente)
* PUT/PATCH (atualização)
* DELETE (remoção, idempotente)

### **3.5 Status Codes**

* **2xx:** 200, 201, 204
* **4xx:** 400, 401, 403, 404, 409
* **5xx:** 500, 503
* Uso adequado em cenários de validação, autenticação e inexistência de recursos.

---

## **4. ATIVIDADES**

### **4.1 Quiz Individual**

* 6 questões para cada um dos conteúdos, sendo eles: princípios REST, endpoints, métodos HTTP e status codes.

---

## **5. AVALIAÇÃO**

### **5.1 Formativa**

**Quiz – 100%**

* Questões sobre REST, HTTP e status codes.

### **5.2 Somativa**

Trabalho individual: implementação de API REST com pelo menos 3 recursos, CRUD, validações, documentação e testes.

### **5.3 Autoavaliação**

Reflexão sobre dificuldades e domínio dos conceitos.

---

## **6. RECURSOS DIDÁTICOS**

* Computador, internet, projetor.
* Objeto de aprendizagem interativo (React/TS).

---

## **7. REFERÊNCIAS**

Fielding (REST – tese), Richardson & Ruby, REST API Design Rulebook, MDN HTTP, RESTfulAPI.net, OpenAPI, artigos sobre REST e guias oficiais de design de APIs (Postman, Azure, Google Cloud).
