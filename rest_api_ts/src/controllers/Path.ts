import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Path from '../models/Path';

const createPath = (req: Request, res: Response, next: NextFunction) => {
    const { departure_warehouse, arrival_warehouse, distance, time, energy_used, extra_time } = req.body;

    const path = new Path({
        _id: new mongoose.Types.ObjectId(),
        departure_warehouse,
        arrival_warehouse,
        distance,
        time,
        energy_used,
        extra_time
    });

    return path
        .save()
        .then((path) => res.status(201).json({ path }))
        .catch((error) => res.status(500).json({ error }));
};
const readPath = (req: Request, res: Response, next: NextFunction) => {
    const pathId = req.params.pathId;

    return Path.findById(pathId)
        .then((path) => (path ? res.status(200).json({ path }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const readAllPaths = (req: Request, res: Response, next: NextFunction) => {
    return Path.find()
        .then((paths) => res.status(200).json({ paths }))
        .catch((error) => res.status(500).json({ error }));
};
const updatePath = (req: Request, res: Response, next: NextFunction) => {
    const pathId = req.params.pathId;

    return Path.findById(pathId)
        .then((path) => {
            if (path) {
                path.set(req.body);

                return path
                    .save()
                    .then((path) => res.status(201).json({ path }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};
const deletePath = (req: Request, res: Response, next: NextFunction) => {
    const pathId = req.params.pathId;

    return Path.findByIdAndDelete(pathId)
        .then((path) => (path ? res.status(201).json({ path, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { createPath, readPath, readAllPaths, updatePath, deletePath };
