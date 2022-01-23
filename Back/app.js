const express = require("express")
const cors = require('cors')
const sequelize = require("./db/connection")

//Objeto Express
const app = express();
//Config
app.use(cors())
app.use(express.urlencoded({ extended:false }))
app.use(express.json())


//Rutas, se antepone prefijo
app.use('/api', require('./routes/authentication'))
app.use('/movements', existsToken ,require('./routes/Movements'))
app.use('/statistics', existsToken, require('./routes/statistics'))




//--------------------------SERVER---------------------------------------------------------
app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), () => {
    console.log(`Server corriendo en ${app.get('port')}`)

    //db conexion
    sequelize.authenticate().then(() => {
        console.log("Database Conected...")
    }).catch(err => console.log('Error in database...', err))

})
//------------------------------------------------------------------------------------------



//Authorization: Bearer <token>
//Comprueba la existenia de token
function existsToken(req, res, next){
    const bearerHeader =  req.headers['authorization'];
console.log(bearerHeader)

    if(typeof bearerHeader !== 'undefined'){
	
         const bearerToken = bearerHeader.split(" ")[1];
         req.token  = bearerToken;
	 console.log(req.token, 'juan')
	 next();
    }else{
	console.log(2)
        res.sendStatus(401);
    }
}
