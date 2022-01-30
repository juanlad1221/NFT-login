require('dotenv').config()
const express = require("express")
const router = express.Router()

//lib para crear token
const jwt = require("jsonwebtoken")



//Ruta home
router.get('/', (req, res) => {

    //Verifico el token
    jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
        if (err) {
            //Token incorrecto
            res.sendStatus(403)
        } else {
            //Token correcto
            res.send('si ves esto es que tienes token...')
        }
    })//end jwt
})//end

module.exports = router