const Sequelize = require('sequelize')
const db = require('../db')

const Acquaintance = db.define('acquaintance', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
    // validate: {
    //   notEmpty: true
    // }
  },
  meetingSummary: {
    type: Sequelize.TEXT
  },
  physicalDescription: {
    type: Sequelize.TEXT
  },
  location: {
    type: Sequelize.STRING
  },
  geoTaggedLocation: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.STRING
  },
  audioPronunciation: {
    type: Sequelize.BLOB
  }
})

module.exports = Acquaintance
