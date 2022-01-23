const express = require("express")
const jwt = require("jsonwebtoken")
const { QueryTypes } = require('sequelize')
const sequelize = require("../db/connection")
const router = express.Router()


//Url que envia estadisticas
router.get("/chart",async (req, res) => {
   
    //Verifico que el token sea correcto.
    jwt.verify(req.token, 'secretkey', async (err, authData) => { 
        if (err) {
            
            //Envio error
            res.sendStatus(403)
        } else {
           
            //Obtengo el id user
            const id_user = await sequelize.query(`SELECT * FROM users WHERE user = '${authData.user.user}' AND active = 1`, { type: QueryTypes.SELECT })
	    
            //Traigo todos los movimientos
            const sum_addition = await sequelize.query(`SELECT SUM(amount) FROM movements WHERE active = 1 AND type = 1 AND id_user = ${id_user[0]['id_user']}`, { type: QueryTypes.SELECT })
            const sum_subtraction = await sequelize.query(`SELECT SUM(amount) FROM movements WHERE active = 1 AND type = 0 AND id_user = ${id_user[0]['id_user']}`, { type: QueryTypes.SELECT })
            
            //obtengo el balance del user
	     let balance = Number(sum_addition[0]['SUM(amount)']) - Number(sum_subtraction[0]['SUM(amount)'])

            //envio en formato json
            res.status(200).json({
                suma:sum_addition[0]['SUM(amount)'],
                resta:sum_subtraction[0]['SUM(amount)'],
                balance
                })
        }
    })
	
})



module.exports = router