import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Truck from '../models/Truck';

const createTruck = (req: Request, res: Response, next: NextFunction) => {
    const { tare, load_capacity, maximum_battery_charge, autonomy_when_fully_charged, fast_charging_time } = req.body;

    const truck = new Truck({
        _id: new mongoose.Types.ObjectId(),
        tare,
        load_capacity,
        maximum_battery_charge,
        autonomy_when_fully_charged,
        fast_charging_time
    });

    return truck
        .save()
        .then((truck) => res.status(201).json({ truck }))
        .catch((error) => res.status(500).json({ error }));
};
const readTruck = (req: Request, res: Response, next: NextFunction) => {
    const truckId = req.params.truckId;

    return Truck.findById(truckId)
        .then((truck) => (truck ? res.status(200).json({ truck }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAllTrucks = (req: Request, res: Response, next: NextFunction) => {
    return Truck.find()
        .then((trucks) => res.status(200).json({ trucks }))
        .catch((error) => res.status(500).json({ error }));
};
const updateTruck = (req: Request, res: Response, next: NextFunction) => {
    const truckId = req.params.truckId;

    return Truck.findById(truckId)
        .then((truck) => {
            if (truck) {
                truck.set(req.body);

                return truck
                    .save()
                    .then((truck) => res.status(201).json({ truck }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deleteTruck = (req: Request, res: Response, next: NextFunction) => {
    const truckId = req.params.truckId;

    return Truck.findByIdAndDelete(truckId)
        .then((truck) => (truck ? res.status(201).json({ truck, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createTruck, readTruck, readAllTrucks, updateTruck, deleteTruck };
