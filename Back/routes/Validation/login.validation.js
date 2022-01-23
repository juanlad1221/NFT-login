const joi = require('joi')

const loginShema = joi.object({
    user: joi.string().required(),
    password: joi.string().required()
})

module.exports = loginShema