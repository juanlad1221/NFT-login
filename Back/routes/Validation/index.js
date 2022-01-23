const login = require('./login.validation')
const create = require('./create.validation')
const delete_ = require('./delete.validation')
const update = require('./update.validation')

module.exports = {
    login,
    create,
    delete_,
    update
}