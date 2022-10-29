const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
    tare: {
        required : true,
        type : Number
    },
    load_capacity: {
        required : true,
        type : Number
    },
    maximum_battery_charge: {
        required : true,
        type : Number
    },
    autonomy_when_fully_charged: {
        required : true,
        type : Number
    },
    fast_charging_time: {
        required : true,
        type : Number
    }

})

module.exports = mongoose.model('Truck', truckSchema);