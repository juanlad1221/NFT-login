const joi = require('joi')

const loginShema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
})

module.exports = loginShema