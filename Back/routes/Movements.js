const express = require("express")
const jwt = require("jsonwebtoken")
const { QueryTypes } = require('sequelize')
const sequelize = require("../db/connection")
const router = express.Router()
const Tools = require('./Tools/Tools')
const Validator = require('./Validation/middelware.validation')

//Url envia registros
router.get("/all", async (req, res) => {

    //Obtengo todos los movimientos
    const all_movements = await sequelize.query(`SELECT * FROM movements WHERE active = 1 ORDER BY date DESC LIMIT 10`, { type: QueryTypes.SELECT })
    
    //Armo un nuevo array con la particularidad de que en el campo type
    //dice entry o exit segun corresponda.
    arr = []
    all_movements.forEach(e => {
        if (e.type === 1) {
            obj = {
                id_cash_movement: e.id_cash_movement,
                id_user: e.id_user,
                concept: e.concept,
                type: 'entry',
                amount: e.amount,
                date: e.date,
                active: e.active
            }
        } else {
            obj = {
                id_cash_movement: e.id_cash_movement,
                id_user: e.id_user,
                concept: e.concept,
                type: 'exit',
                amount: e.amount,
                date: e.date,
                active: e.active
            }
        }
        arr.push(obj)
    })//end for

	//envio respuesta en formato json
    res.status(200).json({ status: 200, arr })
})//end


//Url da de baja un registro
router.delete('/delete', Validator('delete_'), async (req, res) => {
    //Obtengo el id a eliminar/baja
    let id_to_delete = req.body.id

    //Se modifica el campo active, asi se da de baja el registro
    let resp = await sequelize.query(`UPDATE movements SET active = 0 WHERE id_cash_movement = ${id_to_delete}`, { type: QueryTypes.UPDATE })
    
    //Verifico el token
    jwt.verify(req.token, 'secretkey', (err, authData) => {
        if (err) {
            res.sendStatus(403)
        } else {
            //envio en formato json
            res.status(200).json({msg:'DELETE SUCCESSFUL'})
        }
    })
})

//Actualiza un registro
router.put('/update', Validator('update'), async (req, res) => {
    const {id_cash_movement, id_user, concept, amount, date } = req.body
    
    //Se modifican los campos necesarios
    let resp = await sequelize.query(`UPDATE movements SET concept = '${concept}', amount = ${amount}, date = ${date} WHERE active = 1 AND id_cash_movement = ${id_cash_movement} AND id_user = ${id_user}`, { type: QueryTypes.UPDATE })
    
    //Envio respuesta
    res.status(200).json({msg:'SUCCESSFUL UPDATE...'})
})

//Crea un registro
/*router.post('/create', Validator('create'), async (req, res) => {
    const {concept, amount, type } = req.body
    //const {dateNow} = Tools

    //Se insertan datos
    let resp = await sequelize.query(`INSERT INTO movements (amount, date, concept, type)
    VALUES (${amount}, '${dateNow()}', '${concept}', ${type})`, { type: QueryTypes.INSERT})
    
    //Envio respuesta
    res.status(200).json({msg:'SUCCESSFUL CREATION...'})
})*/

router.post('/create', async (req, res) => {
	

    //Verifico que el token sea correcto.
    jwt.verify(req.token, 'secretkey', async (err, authData) => { 
        if (err) {
            console.log(req.body,'juanse')
            //Envio error
            res.sendStatus(403)
        } else {
           
		const {concept, amount, type } = req.body
		
		 //Obtengo el id user
            	 const id_user = await sequelize.query(`SELECT * FROM users WHERE user = '${authData.user.user}' AND active = 1`, { type: QueryTypes.SELECT })
		 let id = id_user[0]['id_user']

    		//Se insertan datos
    		let resp = await sequelize.query(`INSERT INTO movements (amount, date, concept, type, id_user)
    		VALUES (${amount}, NOW(), '${concept}', ${type}, ${id})`, { type: QueryTypes.INSERT})

		//Obtengo todos los movimientos
    		const all_movements = await sequelize.query(`SELECT * FROM movements WHERE active = 1 ORDER BY date DESC LIMIT 10`, { type: QueryTypes.SELECT })
		//Armo un nuevo array con la particularidad de que en el campo type
    //dice entry o exit segun corresponda.
    arr = []
    all_movements.forEach(e => {
        if (e.type === 1) {
            obj = {
                id_cash_movement: e.id_cash_movement,
                id_user: e.id_user,
                concept: e.concept,
                type: 'entry',
                amount: e.amount,
                date: e.date,
                active: e.active
            }
        } else {
            obj = {
                id_cash_movement: e.id_cash_movement,
                id_user: e.id_user,
                concept: e.concept,
                type: 'exit',
                amount: e.amount,
                date: e.date,
                active: e.active
            }
        }
        arr.push(obj)
    })//end for


		//Traigo todos los movimientos
            const sum_addition = await sequelize.query(`SELECT SUM(amount) FROM movements WHERE active = 1 AND type = 1 AND id_user = ${id_user[0]['id_user']}`, { type: QueryTypes.SELECT })
            const sum_subtraction = await sequelize.query(`SELECT SUM(amount) FROM movements WHERE active = 1 AND type = 0 AND id_user = ${id_user[0]['id_user']}`, { type: QueryTypes.SELECT })
            
            //obtengo el balance del user
	     let balance = Number(sum_addition[0]['SUM(amount)']) - Number(sum_subtraction[0]['SUM(amount)'])


    		
   		//Envio respuesta
    		res.status(200).json({msg:'SUCCESSFUL CREATION...',arr, suma:sum_addition[0]['SUM(amount)'],
                resta:sum_subtraction[0]['SUM(amount)'],
                balance})
            
        }
})
})


module.exports = router