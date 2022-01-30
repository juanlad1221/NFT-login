const express = require("express")
const cors = require('cors')
const logger = require('morgan')


//Objeto Express
const app = express();
//Config
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(logger('dev'))


//Rutas login y register
app.use('/api', require('./routes/authentication'))
// Ruta home
app.use('/home', existsToken ,require('./routes/home'))



//Conexion BD
require('./db/conection');



//--------------------------SERVER---------------------------------------------------------
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
    console.log(`Server run on ${app.get('port')}...`)
})
//------------------------------------------------------------------------------------------




//Authorization: Bearer <token>
//Comprueba la existenia de token
function existsToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {

        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;

        next();
    } else {

        res.sendStatus(401);
    }
}
