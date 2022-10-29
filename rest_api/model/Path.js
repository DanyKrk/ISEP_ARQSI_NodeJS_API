const mongoose = require('mongoose');

const pathSchema = new mongoose.Schema({
    departure_warehouse:{
        required: true,
        type: String
    },
    arrival_warehouse:{
        required: true,
        type: String
    },
    distance: {
        required: true,
        type: Number
    },
    time: {
        required: true,
        type: Number
    },
    energy_used: {
        required: true,
        type: Number
    },
    extra_time: {
        required: true,
        type: Number
    }

})

module.exports = mongoose.model('Path', pathSchema);