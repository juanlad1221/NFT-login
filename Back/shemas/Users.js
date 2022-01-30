const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const users_schema = Schema({
    username:            {type:String, requerid:true},
    password:            {type:String, requerid:true},
    email:               {type:String, requerid:true},
    active:              {type:Boolean, requerid:true, default:true}
    
});

//Exporto modelo
module.exports = mongoose.model('users',users_schema);