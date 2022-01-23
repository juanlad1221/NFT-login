const joi = require('joi')

const deleteShema = joi.object({
    id: joi.string().required()
})

module.exports = deleteShema