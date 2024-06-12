require('dotenv').config();
const { Sequelize } = require('sequelize');

/**
 * Configura e exporta uma instância do Sequelize para conexão com o banco de dados PostgreSQL.
 */
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
  }
);

module.exports = sequelize;
