const Sequelize = require('sequelize');
const { db }  = require("../dataBase/db.js");

const Token = db.define('tokens', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    token: {
      type: Sequelize.STRING(500),
      allowNull: false,
    },
    expiresIn: {
      type: Sequelize.DATE, 
      allowNull: false,
    },
  }, {
    timestamps: true,
  });

module.exports = Token;