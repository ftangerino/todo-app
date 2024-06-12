const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

/**
 * Modelo da tabela User no banco de dados.
 * Define as colunas e suas propriedades.
 */
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
