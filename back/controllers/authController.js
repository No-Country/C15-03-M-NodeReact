const Usuarios = require("../models/Usuario");
const jwt = require('jsonwebtoken');

const crearUsuario = async (req, res) => {
  try {
    await Usuarios.create(req.body);
    res.json({
      msg: 'Usuario creado con éxito'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al crear usuario'
    });
  }
};

const autenticarUsuario = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const usuario = await Usuarios.findOne({
      where: { email: email }
    });

    if (!usuario) {
      return res.status(400).json({ mensaje: 'Ese usuario no existe' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, usuario.contrasena);

    if (!isPasswordCorrect) {
      return res.status(400).json({ msg: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        email: usuario.email,
        nombre: usuario.nombre,
        id: usuario.id // Usar 'id' en lugar de '_id'
      },
      'LLAVESECRETA',
      { expiresIn: '1h' }
    );

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al autenticar usuario' });
  }
};

const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll();
    res.json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error al obtener usuarios"
    });
  }
};

const obtenerUsuarioId = async (req, res) => {
  const id = req.params.id;
  try {
    const usuario = await Usuarios.findByPk(id);
    if (usuario) {
      res.json(usuario);
    } else {
      res.status(404).json({
        message: "Usuario no encontrado"
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Error al obtener usuario"
    });
  }
};

// reset y forgot password

module.exports = {
  crearUsuario,
  autenticarUsuario,
  obtenerUsuarios,
  obtenerUsuarioId
};
