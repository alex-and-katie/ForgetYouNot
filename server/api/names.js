// all routes mounted on /api/names

const router = require('express').Router()
const {Acquaintance} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try{
    const names = await Acquaintance.findAll()
    res.json(names)
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const name = await Acquaintance.create({
      name: req.body.name,
      meetingSummary: req.body.meetingSummary,
      physicalDescription: req.body.physicalDescription,
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
