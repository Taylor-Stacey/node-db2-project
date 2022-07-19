const Car = require('./cars-model')

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
  const { vin, make, model, mileage, title, transmission } = req.body
  if(!vin || !vin.trim()){
    res.status(400).json({ message: 'vin is missing',})
  }
  if(!make || !make.trim()){
    res.status(400).json({ message: 'make is missing',})
  }
  if(!model || !model.trim()){
    res.status(400).json({ message: 'model is missing',})
  }
  if(!mileage){
    res.status(400).json({ message: 'mileage is missing',})
  }
 req.newCar = { vin: req.body.vin.trim(), make: req.body.make.trim(), model: req.body.model.trim(), mileage: req.body.mileage, title: req.body.title.trim(), transmission: req.body.transmission.trim() };
 next();
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}