require('dotenv').config();
const { Client } = require('pg');

// Configurações de conexão com o banco de dados a partir do arquivo .env
const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

/**
 * Query para criar a tabela 'tasks_test2' se ela não existir.
 */
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS tasks_test2 (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(20) NOT NULL CHECK (status IN ('pendente', 'em progresso', 'concluída')),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  );
`;

/**
 * Conecta ao banco de dados, cria a tabela 'tasks_test2' e fecha a conexão.
 */
client.connect()
  .then(() => {
    console.log('Conectado ao banco de dados');
    return client.query(createTableQuery);
  })
  .then(() => {
    console.log('Tabela tasks criada com sucesso');
  })
  .catch(err => {
    console.error('Erro ao criar tabela tasks:', err);
  })
  .finally(() => {
    client.end();
  });
