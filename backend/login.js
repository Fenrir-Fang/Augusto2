const sequelize = require("./conexionDB")

const { Sequelize, DataTypes } = require('sequelize');const Users = sequelize.define(
    'user',
  
  {
    id:{
        type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true
    }, 
    username:{
        type: DataTypes.STRING, allowNull: false,
    },
    password:{
        type: DataTypes.INTEGER, allowNull: false
    },
    
  },    
  {
    timestamps: false
  },
);
  module.exports = Users;