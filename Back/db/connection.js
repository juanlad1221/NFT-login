const { Sequelize } = require('sequelize')
const {database} = require('./config')

//Info para acceder a la DB...
console.log(database)

//Objeto sequelize
const sequelize = new Sequelize(database.database, database.username, database.password, {
    host: 'b6mxfwstbbkhwzvw4rnn-mysql.services.clever-cloud.com',
    port: 3306,
    dialect: 'mysql' 
  });


module.exports = sequelize