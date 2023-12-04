// nombre, apellido, password , correo, pais, estado, ciudad, codigoPostal,
const Sequelize = require('sequelize')
const {db} = require("../dataBase/db.js")
const { v4: uuidv4 } = require('uuid');

 
 
const Productos = db.define('productos',{
    id:{
        type:Sequelize.UUID,
        primaryKey:true,
        allowNull:false,
        defaultValue: uuidv4(),
    },
    titulo:{
        type: Sequelize.STRING(50),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'El nombre no puede estar vacio'
            }
        }

    },
    precio:{
        type: Sequelize.FLOAT,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:'El precio no puede estar vacio'
            }
        }
        
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
        
    },
    in_stock:{
        type: Sequelize.INTEGER,
        defaultValue:1

    },
    imagen:Sequelize.STRING(60),
    descripcion:{
        type:Sequelize.STRING(120),
        allowNull:true,
    },
    activo:{
        type:Sequelize.BOOLEAN,
        defaultValue:false
    }
})


 
module.exports = Productos;