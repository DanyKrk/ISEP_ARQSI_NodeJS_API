const express = require('express');

const router = express.Router();

module.exports = router;

const Path = require('../model/Path');


//Post Method
router.post('/post', async (req, res) => {
    const path = new Path({
        departure_warehouse: req.body.departure_warehouse,
        arrival_warehouse: req.body.arrival_warehouse,
        distance: req.body.distance,
        time: req.body.time,
        energy_used: req.body.energy_used,
        extra_time: req.body.extra_time
    })

    try {
        const dataToSave = await path.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }

})

//Get all Method
router.get('/getAll', async (req, res) => {
    try{
        const data = await Path.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await Path.findById(req.params.id);
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

        const result = await Path.findByIdAndUpdate(
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
        const data = await Path.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})