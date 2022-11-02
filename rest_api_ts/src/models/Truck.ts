import mongoose, { Document, Schema } from 'mongoose';

export interface ITruck {
    tare: number;
    load_capacity: number;
    maximum_battery_charge: number;
    autonomy_when_fully_charged: number;
    fast_charging_time: number;
}

export interface ITruckModel extends ITruck, Document {}

const TruckSchema: Schema = new Schema(
    {
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
    {
        versionKey: false
    }
);

export default mongoose.model<ITruckModel>('Truck', TruckSchema);
