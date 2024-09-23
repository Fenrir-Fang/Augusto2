const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('fifa', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
  module.exports = sequelize