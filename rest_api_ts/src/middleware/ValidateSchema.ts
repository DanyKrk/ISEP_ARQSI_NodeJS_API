import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Response, Request } from 'express';
import Logging from '../library/logging';
import { ITruck } from '../models/Truck';
import { IPath } from '../models/Path';

export const ValidateSchema = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);
            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    truck: {
        create: Joi.object<ITruck>({
            tare: Joi.number().required(),
            load_capacity: Joi.number().required(),
            maximum_battery_charge: Joi.number().required(),
            autonomy_when_fully_charged: Joi.number().required(),
            fast_charging_time: Joi.number().required()
        }),
        update: Joi.object<ITruck>({
            tare: Joi.number().required(),
            load_capacity: Joi.number().required(),
            maximum_battery_charge: Joi.number().required(),
            autonomy_when_fully_charged: Joi.number().required(),
            fast_charging_time: Joi.number().required()
        })
    },
    path: {
        create: Joi.object<IPath>({
            departure_warehouse: Joi.string().required(),
            arrival_warehouse: Joi.string().required(),
            distance: Joi.number().required(),
            time: Joi.number().required(),
            energy_used: Joi.number().required(),
            extra_time: Joi.number().required()
        }),
        update: Joi.object<IPath>({
            departure_warehouse: Joi.string().required(),
            arrival_warehouse: Joi.string().required(),
            distance: Joi.number().required(),
            time: Joi.number().required(),
            energy_used: Joi.number().required(),
            extra_time: Joi.number().required()
        })
    }
};
