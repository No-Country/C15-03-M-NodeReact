const multer = require('multer');
const path = require('path');
const User = require('../models/Usuario');

const projectRoot = path.dirname(require.main.filename);

const fileFilter = (req, file, cb) => {
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
    cb(null , true);
  } else {
    cb(new Error('Formato no valido'), false);
  }
};

const limits = {
  fileSize: 1000 * 1000 // 1 mb
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null,  path.join(__dirname, '../../front/public/uploads/productos/'));
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage, fileFilter, limits });

const uploadImage = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.usuario.id);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado'})
    }
    if (!req.file) {
      return res.status(400).json({ error: 'No se subió ningún archivo'});
    }
    const relativePath = path.relative(projectRoot, req.file.path);
    const shortPath = relativePath.replace('front\\public\\uploads\\productos\\', '')
    user.imagen = shortPath;
    await user.save();
    console.log('imagen cargada')
    res.json(user);
  } catch(err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  upload,
  uploadImage
};