const {Sequelize} = require('sequelize')
require('dotenv').config({path:'.env'})
// const Usuario = require('../models/Usuario'); 
// const Token = require('../models/Token'); 

const db = new Sequelize(process.env.BD_NOMBRE,process.env.BD_USER,process.env.BD_PASS,{
    host:process.env.BD_HOST,
    port:process.env.BD_PORT,
    dialect :'postgres',
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
    
})
 



// Usuario.hasMany(Token, { foreignKey: 'userId' });
// Token.belongsTo(Usuario, { foreignKey: 'userId' });

module.exports = {
  db,
  

};