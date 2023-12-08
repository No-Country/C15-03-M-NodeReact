// nombre, apellido, password , correo, pais, estado, ciudad, codigoPostal,
const Sequelize = require('sequelize')
const {db} = require("../dataBase/db.js")
 
const Productos = require('./Producto.js')
const Usuarios = require('./Usuario.js')
 
const Pedidos = db.define('pedidos',{
    id:{
        type:Sequelize.UUID,
        primaryKey:true,
        allowNull:false,
        defaultValue: Sequelize.UUIDV4,
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