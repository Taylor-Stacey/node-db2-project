const Car = require('./cars-model')
const vin = require('vin-validator')

async function checkCarId (req, res, next) {
  try{
    const car = await Car.getById(req.params.id)
    if(!car) {
      res.status(404).json({
        message: `message: "car with id ${id} is not found"`,
      })
    }else {
      req.car = car
      next()
    }
  } catch(err){
    res.status(500).json({
      message: 'problem finding car',
    })
  }
}

function checkCarPayload (req, res, next) {

  if(!req.body.vin) {
    res.status(400).json({message: 'vin is missing'})
  }
  if(!req.body.make) {
    res.status(400).json({message: 'make is missing'})
  }
  if(!req.body.model) {
    res.status(400).json({message: 'model is missing'})
  }
  if(!req.body.mileage) {
    res.status(400).json({message: 'mileage is missing'})
  }
  next()
}

const checkVinNumberValid = (req, res, next) => {
  if(vin.validate(req.body.vin)){
    next()
  }else{
    res.status(400).json({message: `vin ${req.body.vin} is invalid`})
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  try{
    const existing = await Car.getByVin(req.body.vin)
    if(!existing){
      next()
    }else {
      res.status(400).json({message: `vin ${req.body.vin} already exists`})
    }
  }catch(err){
    next(err)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}