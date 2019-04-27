const User = require('./user')
const Acquaintance = require('./acquaintance')

Acquaintance.belongsTo(User)
User.hasMany(Acquaintance)

module.exports = {
  User,
  Acquaintance
}
