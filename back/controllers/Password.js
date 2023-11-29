const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Usuario = require('../models/Usuario');
const Token = require('../models/Token'); // Deberías tener un modelo para almacenar los tokens

// Ruta para solicitar restablecimiento de contraseña
const solicitarReset = async (req, res) => {
  const { email } = req.body;

  // Verificar si el usuario existe
  const usuario = await Usuario.findOne({ where: { email } });

  if (!usuario) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  // Generar un token único y guardarlo en la base de datos
  const token = jwt.sign({ userId: usuario.id }, 'LLAVESECRETA', { expiresIn: '1h' });
  await Token.create({ userId: usuario.id, token });

  // Enviar un correo electrónico al usuario con el enlace de restablecimiento
  const transporter = nodemailer.createTransport({
    // Configuración del servidor de correo
  });

  const resetUrl = `http://tu-sitio-web/reset-contrasena/${token}`;
  const mensajeCorreo = `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetUrl}`;

  await transporter.sendMail({
    to: email,
    subject: 'Restablecimiento de Contraseña',
    text: mensajeCorreo,
  });

  res.json({ mensaje: 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña' });
};

// Ruta para validar y cambiar la contraseña
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { nuevaContrasena } = req.body;

  // Verificar si el token es válido
  const tokenDB = await Token.findOne({ where: { token } });

  if (!tokenDB || jwt.verify(token, 'LLAVESECRETA')) {
    return res.status(400).json({ mensaje: 'Token inválido o expirado' });
  }

  // Cambiar la contraseña del usuario
  const usuario = await Usuario.findByPk(tokenDB.userId);
  const hashedContrasena = await bcrypt.hash(nuevaContrasena, 10);

  await usuario.update({ contrasena: hashedContrasena });

  // Eliminar el token de la base de datos después de usarlo
  await tokenDB.destroy();

  res.json({ mensaje: 'Contraseña restablecida con éxito' });
}


const updatePassword = async (req, res) => {
  try {
    // Paso 1: Validar la solicitud
    const { userId, oldPassword, newPassword } = req.body;

    if (!userId || !oldPassword || !newPassword) {
      return res.status(400).json({ mensaje: 'Faltan datos en la solicitud' });
    }

    // Paso 2: Buscar al usuario en la base de datos
    const usuario = await Usuario.findByPk(userId);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Paso 3: Verificar la contraseña antigua
    const isPasswordCorrect = await bcrypt.compare(oldPassword, usuario.contrasena);

    if (!isPasswordCorrect) {
      return res.status(400).json({ mensaje: 'La contraseña antigua es incorrecta' });
    }

    // Paso 4: Actualizar la contraseña
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await usuario.update({ contrasena: hashedNewPassword });

    // Paso 5: Responder con éxito
    return res.json({ mensaje: 'Contraseña actualizada con éxito' });
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    return res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};


module.exports = {
    solicitarReset,
    resetPassword,
    updatePassword


}
