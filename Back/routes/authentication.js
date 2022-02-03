require('dotenv').config()
const express = require("express")
const router = express.Router()

//lib para crear token
const jwt = require("jsonwebtoken")

//lib para crear hash
const bcrypt = require('bcryptjs')

//lib o framework p/ hacer validaciones a datos de entrada
const Validator = require('./Validation/middelware.validation')



//Shemas
const User = require('../shemas/Users')
//configuro el hash con 8 caracteres.
let salt = bcrypt.genSaltSync(8)


// USERNAME:nft-project
// PASSWORD: 1234
// TB PUEDEN REGISTRAR NUEVO USUARIOS



//route login
router.post("/login", Validator('login'), async (req, res) => {

    //Se recive los datos ya validados
    const user = req.body
	
	
    //Flag para controlar la generacion del token
    usernameFlag = false
    passwordFlag = false

    //Msg de error que se enviará si password o username son incorrectos
    const Error = () => {
        res.status(403).json({ msg: 'Error: User or Password not found...' })
    }

    
   
    //Consulta para obtener el username
    const result = await User.findOne({ username: user.username, active: true }).exec()
    
    //Si existe username usernameFlag a true
    if(!Object.is(result, null)){
        usernameFlag = true
    }else{
        //Si no existe username msg error
        Error()
    }


    
    //Compara las password de la BD y la que envió el usuario
    let resultPasswordCoparate = bcrypt.compareSync(user.password, result.password)

    //Si la comparacion es existosa passwordFlag a true
    if(resultPasswordCoparate){
        passwordFlag = true
    }else{
        //Sino es exitosa la comparacion msg error
        Error()
    }
    
    
    
   //Si ambos flag son true se genera el token
    if (usernameFlag && passwordFlag) {

        //Se genera y envia el token de seguridad mas el usuario
        jwt.sign({ user }, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRES_IN }, (err, token) => {
            
            res.status(200).json({
                token,
                username:user.username
            })
        })

    } else {
        //Si no se genero el token responde error not found
        Error()
    }
})//end


router.post('/register', Validator('register'), async (req, res) => {
    //Se recive los datos
    const new_user = req.body

    //se encripta el password
    let passhs = bcrypt.hashSync(new_user.password, salt)

    //se crea el usuario con el schema
    let user = new User({
        username:new_user.username,
        password:passhs,
        email:new_user.email
    })
    //save model
    await user.save()
    console.log('new user register...');
    res.status(200).json({msg:'Register Exitoso'})
    

})//end


module.exports = router