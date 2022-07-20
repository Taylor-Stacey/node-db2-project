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

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req,res,next)=> {
    try{
        const car = await Cars.create(req.body)
        res.json(car)
    }catch(err){
        next(err)
    }
});



module.exports = router;