const express = require('express');

const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require('./cars-middleware');
const Cars = require('./cars-model');

const router = express.Router();

router.get('/', (req,res,next) => {
    Cars.getAll()
    .then(car => {
        res.json(car)
    })    
    .catch(next)
});

router.get('/:id', (req,res)=>{
    Cars.getById(req.params.id)
    .then(car => {
        if(car) {
            res.json(car);
        }else{
            res.status(404).json({ message: 'id not found'});
        }
    })
    .catch(err => {
        res.status(500).json({message: `failed to retrieve car: ${err.message}`});
    });
});

router.post('/', checkCarPayload, (req,res)=> {
    Cars.create({ vin: req.body.vin , make: req.body.make , model: req.body.model , mileage: req.body.mileage, title: req.body.title, transmission: req.body.transmission})
    .then(newCarEntry => {
        res.status(201).json(newCarEntry);
    })
    .catch(err => {
        res.status(500).json({ message: 'Error adding the car', })
    });
});

router.use((err, req, res, next) => { // eslint-disable-line
    res.status(err.status || 500).json({
      message: err.message,
      stack: err.stack,
    })
  })

module.exports = router;