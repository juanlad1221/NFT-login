const joi = require('joi')

const updateShema = joi.object({
    amount: joi.number().required(),
    date: joi.date().required(),
    concept: joi.string().required(),
    id_user: joi.string().required(),
    id_cash_movement: joi.string().required()
})

module.exports = updateShema