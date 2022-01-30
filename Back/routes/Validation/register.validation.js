const joi = require('joi')

const registerShema = joi.object({
    username: joi.string().required(),
    password: joi.string().required(),
    email:joi.string().email().required()
})

module.exports = registerShema