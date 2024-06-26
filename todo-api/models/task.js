const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * Modelo da tabela Task no banco de dados.
 * Define as colunas e suas propriedades.
 */
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pendente', 'em progresso', 'concluída'),
    defaultValue: 'pendente',
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

module.exports = Task;
