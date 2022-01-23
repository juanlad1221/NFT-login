const express = require("express");
const router = express.Router()
const jwt = require("jsonwebtoken")
const { QueryTypes } = require('sequelize')
const sequelize = require("../db/connection")


router.post("/login", async (req, res) => {

    //Se recive los datos
    const user = req.body
    //consulta
    const result = await sequelize.query('SELECT COUNT(*) FROM users WHERE user = '  + "'" + user.user + "'" + 'AND password = '+ "'" + user.password + "'", { type: QueryTypes.SELECT })
	//controla que el resultado sea mayor a cero
	if(Object.values(result[0]) > 0){
		
        //Se genera y envia el token de seguridad
        jwt.sign({ user }, 'secretkey', { expiresIn: '1h' }, (err, token) => {
            res.json({
                token,
		user
            })
        })
            
	}else {
        res.status(404).json({ status: 404, msg: 'Error: Data not found...' })
    }
})//end




module.exports = router