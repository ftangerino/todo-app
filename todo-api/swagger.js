const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To-Do API',
      version: '1.0.0',
      description: 'API para gerenciar uma lista de tarefas',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Caminho para os arquivos de rota
};

const specs = swaggerJsdoc(options);

/**
 * Configura o Swagger UI para a documentação da API.
 * 
 * @param {Object} app - Instância do aplicativo Express.
 */
module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};
