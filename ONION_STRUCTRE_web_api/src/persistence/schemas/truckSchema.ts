import {ITruckPersistence} from "../../dataschema/ITruckPersistence";
import mongoose from "mongoose";

const Truck = new mongoose.Schema(

    {
        domainId:{
            type: String,
            unique: true
        },
        tare: {
                required: true,
                type: Number
            },
        load_capacity: {
                required: true,
                type: Number
            },
        maximum_battery_charge: {
                required: true,
                type: Number
            },
        autonomy_when_fully_charged: {
                required: true,
                type: Number
            },
        fast_charging_time: {
                required: true,
                type: Number
            }
        },
    {timestamps: true}

);

export default mongoose.model<ITruckPersistence & mongoose.Document>("Truck", Truck);
