# Task Manager App

Aplicativo destinado ao gerenciamento de tarefas construído com React e Node.js. O aplicativo permite criar, atualizar, deletar e visualizar tarefas, além de gerenciar o status de cada uma delas.

## Funcionalidades

- Registro e login de usuários
- Criação de novas tarefas
- Atualização e deleção de tarefas
- Visualização de tarefas por status
- Drag and drop para alterar o status das tarefas
- Documentação da API com Swagger

## Requisitos

- Node.js
- npm (Node Package Manager)
- PostgreSQL

## Instalação

### Backend (API)

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/task-manager.git
    ```
2. Navegue até a pasta do backend:
    ```bash
    cd task-manager/todo-api
    ```
3. Instale as dependências:
    ```bash
    npm install
    ```
4. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto com as seguintes informações:
    ```env
    DB_NAME=seu_banco_de_dados
    DB_USER=seu_usuario
    DB_PASSWORD=sua_senha
    DB_HOST=localhost
    DB_PORT=5432
    JWT_SECRET=sua_chave_secreta
    PORT=4000
    ```
5. Inicie o servidor:
    ```bash
    npm start
    ```
6. Acesse a documentação da API (Swagger) em [http://localhost:4000/api-docs](http://localhost:4000/api-docs).

### Frontend (App)

1. Navegue até a pasta do frontend:
    ```bash
    cd ../todo-app
    ```
2. Instale as dependências:
    ```bash
    npm install
    ```
3. Inicie o aplicativo:
    ```bash
    npm start
    ```
4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o aplicativo.

## Uso

1. Acesse a página principal do aplicativo em [http://localhost:3000](http://localhost:3000).
2. Registre-se ou faça login para acessar o gerenciador de tarefas.
3. Crie, atualize, delete e visualize suas tarefas conforme necessário.

## Estrutura do Projeto

### Backend (todo-api)

- `config`: Configurações do banco de dados.
- `controllers`: Controladores que lidam com a lógica das requisições.
- `middleware`: Middlewares para autenticação e outras funções.
- `models`: Modelos do banco de dados.
- `routes`: Rotas da API.
- `swagger`: Configuração do Swagger para a documentação da API.

### Frontend (todo-app)

- `src/components`: Componentes reutilizáveis.
- `src/context`: Contextos para gerenciamento de estado.
- `src/pages`: Páginas do aplicativo.
- `src/services`: Serviços para comunicação com a API.
- `src/styles`: Arquivos de estilo CSS.

## Demonstração da aplicação e diagrama.

[Acesse ao diagrama de fluxo da aplicação no Cacoo](https://cacoo.com/diagrams/Oi8YO7LMgfUPEP3o/04EBE)


[Acesse o video de demonstração no Google Drive](https://drive.google.com/file/d/1tEXEWp5jzWfZZtB08K702ABkeFSoWNob/view?usp=sharing)

## Licença

Este projeto está licenciado sob a Licença MIT.
