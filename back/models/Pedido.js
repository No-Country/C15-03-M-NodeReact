// nombre, apellido, password , correo, pais, estado, ciudad, codigoPostal,
const Sequelize = require('sequelize')
const {db} = require("../dataBase/db.js")
 
const { v4: uuidv4 } = require('uuid');
const Productos = require('./Producto.js')
const Usuarios = require('./Usuario.js')
 
const Pedidos = db.define('pedidos',{
    id:{
        type:Sequelize.UUID,
        primaryKey:true,
        allowNull:false,
        defaultValue: uuidv4(),
    },
    direccion:{
        type: Sequelize.STRING(50),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'Agregue una direccion'
            },
        }

    }

})
Pedidos.belongsTo(Usuarios)
Pedidos.belongsTo(Productos)
module.exports = Pedidos;