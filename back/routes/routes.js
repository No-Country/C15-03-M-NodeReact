const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middleware/validarCampos");
const { esEmailValido, esRoleValido } = require("../helpers/dbValidators");
const { crearUsuario, autenticarUsuario, obtenerUsuarios, obtenerUsuarioId } = require("../controllers/authController");
const { solicitarReset, resetPassword,updatePassword } = require("../controllers/Password");

const router = Router()

router.post('/signup',[
    check('nombre', "El campo nombre es obligatorio").not().isEmpty(),
    check('pais', "El campo pais no puede ir vacio").not().isEmpty(),
    check('estado', "El campo estado no puede ir vacio").not().isEmpty(),
    check('ciudad', "El campo ciudad no puede ir vacio").not().isEmpty(),
    check('password', "La contraseña no es valida y debe tener  mas de 6 letras").isLength({min:6}),
    check('email', "El correo no es valido").isEmail(),
    check('email').custom(esEmailValido),
    
    check('role').custom( esRoleValido),
    validarCampos
], crearUsuario)  


router.post('/signin',[
    check('email', "El correo no es valido").isEmail(),
    check('password', "El campo contraseña no puede ir vacio").not().isEmpty(),

    validarCampos
], autenticarUsuario)  



// Requests password

router.post('/password/reset', solicitarReset)
router.put('/password/reset/:token', resetPassword)

router.put('/password/update',autenticarUsuario, updatePassword)



router.get('/admin/users', obtenerUsuarios);
router.get('/admin/user/:id', obtenerUsuarioId);


module.exports = router