const path = require('path');

const sendProfileImage = async (req, res) => {
  const user = req.usuario;
  const filename = path.basename(user.imagen);
  const imagePath = path.join(__dirname, '..', '..', 'front', 'public', 'uploads', 'perfil', filename);
  res.sendFile(imagePath);
};

module.exports = {
  sendProfileImage
};