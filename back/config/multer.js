const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
  if(file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg"){
    cb(null , true);
  } else {
    cb(new Error('Formato no valido'), false);
  }
};

const limits = {
  fileSize: 10000 // tamaño máximo del archivo en bytes
};

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads');
  },
  filename: function(req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage, fileFilter: fileFilter, limits: limits });

module.exports = upload;