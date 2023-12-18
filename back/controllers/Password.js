const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Usuario = require('../models/Usuario');
const Token = require('../models/Token');

// Ruta para solicitar restablecimiento de contraseña
const solicitarReset = async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar si el usuario existe
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const tokenExpiration = new Date();
    tokenExpiration.setHours(tokenExpiration.getHours() + 1); // Esto establece la expiración en 1 hora
    
    const token = jwt.sign({ userId: usuario.id }, 'LLAVESECRETA', { expiresIn: '1h' });
    await Token.create({ userId: usuario.id, token, expiresIn: tokenExpiration });

    // Configuración del servidor de correo (Gmail en este caso)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'crisezelol@gmail.com',
        pass: 'ufhr lbee cyde imas',
      },
    });

    const resetUrl = `https://localhost:3001/password/reset${token}`;
    const mensajeCorreo = `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetUrl}`;

    await transporter.sendMail({
      from: 'crisezelol@gmail.com',
      to: email, // Usa el correo proporcionado en la solicitud POST
      subject: 'Restablecimiento de Contraseña',
      text: mensajeCorreo,
    });

    res.json({ mensaje: 'Se ha enviado un correo electrónico con instrucciones para restablecer la contraseña' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al solicitar restablecimiento de contraseña' });
  }
};
// Ruta para validar y cambiar la contraseña
const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { nuevaContrasena } = req.body;

  try {
    // Verificar si el token es válido
    const tokenDB = await Token.findOne({ where: { token } });

    if (!tokenDB) {
      return res.status(400).json({ mensaje: 'Token inválido o expirado' });
    }

    jwt.verify(token, 'LLAVESECRETA'); // Intentar verificar el token

    // Si la verificación es exitosa, continuar con la lógica para cambiar la contraseña
    const usuario = await Usuario.findByPk(tokenDB.userId);
    const hashedContrasena = await bcrypt.hash(nuevaContrasena, 10);
    await usuario.update({ contrasena: hashedContrasena });
    await tokenDB.destroy();

    res.json({ mensaje: 'Contraseña restablecida con éxito' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ mensaje: 'Token inválido o expirado' });
  }
};


const updatePassword = async (req, res) => {
  try {
    // Paso 1: Validar la solicitud
    const { email, oldPassword, newPassword } = req.body;

    if (!email || !oldPassword || !newPassword) {
      return res.status(400).json({ mensaje: 'Faltan datos en la solicitud' });
    }

    // Paso 2: Buscar al usuario en la base de datos
    const usuario = await Usuario.findOne({ where: { email } });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Paso 3: Verificar la contraseña antigua
    const isPasswordCorrect = await bcrypt.compare(oldPassword, usuario.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ mensaje: 'La contraseña antigua es incorrecta' });
    }

    // Paso 4: Actualizar la contraseña
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    await usuario.update({ password: hashedNewPassword });

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