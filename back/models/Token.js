// models/Token.js
const { DataTypes } = require('sequelize'); // Asegúrate de importar tu instancia de Sequelize
const {db} = require("../dataBase/db.js")

const Token = db.define('Token', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Token;
