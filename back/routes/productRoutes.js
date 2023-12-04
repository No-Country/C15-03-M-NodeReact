const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middleware/validarCampos");
const { isAuthenticated } = require("../middleware/isAuthenticated");
const router = Router()


router.get('/productos', (req, res) => {
    console.log("aca van a ir los productos");
})

module.exports = router