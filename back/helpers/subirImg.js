const multer = require('multer');
const path = require('path');
const fs = require('fs');
const User = require('../models/Usuario');

const projectRoot = path.dirname(require.main.filename);
const relativeDir = path.join(projectRoot, '/database/imgPerfil');
const absoluteDir = path.resolve(relativeDir);

if (!fs.existsSync(absoluteDir)) {
    fs.mkdirSync(absoluteDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, absoluteDir);
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ex = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ex);
    }
});

const upload = multer({ storage });

const uploadImage = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado'})
        }
        if (!req.file) {
            return res.status(400).json({ error: 'No se subió ningún archivo'});
        }
        const relativePath = path.relative(projectRoot, req.file.path);
        user.imagen = relativePath;
        await user.save();
        console.log('imagen cargada')
        // res.json(user);
    } catch(err) {
        console.log(err);
        res.status(500).send('Server Error');
    }
};

module.exports = {
    upload,
    uploadImage
};
