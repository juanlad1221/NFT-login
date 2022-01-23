const joi = require('joi')

const createShema = joi.object({
    amount: joi.number().required(),
    type: joi.boolean().required(),
    concept: joi.string().required()
})

module.exports = createShema