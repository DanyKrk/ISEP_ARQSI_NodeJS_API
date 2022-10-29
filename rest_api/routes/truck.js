const express = require('express');

const router = express.Router();

module.exports = router;

const Truck = require('../model/Truck');

//Post Method
router.post('/post', async (req, res) => {
    const truck = new Truck({
        tare: req.body.tare,
        load_capacity: req.body.load_capacity,
        maximum_battery_charge: req.body.maximum_battery_charge,
        autonomy_when_fully_charged: req.body.autonomy_when_fully_charged,
        fast_charging_time: req.body.fast_charging_time
    })

    try {
        const dataToSave = await truck.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }

})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Truck.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Truck.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await Truck.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await Truck.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})