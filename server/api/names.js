// all routes mounted on /api/names

const router = require('express').Router()
const {Acquaintance} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const name = await Acquaintance.create({
      name: req.body.name,
      meetingSummary: req.body.meetingSummary,
      physicalDescription: req.body.physicalDescription,
      pronunciation: req.body.pronunciation,
      location: req.body.location,
      geoTaggedLocation: req.body.geoTaggedLocation, //get from API
      date: req.body.date,
      audioPronunciation: req.body.audioPronunciation, //get from API,
      userId: req.user.id
    })
    res.status(201).json(name)
  } catch (err) {
    next(err)
  }
})
