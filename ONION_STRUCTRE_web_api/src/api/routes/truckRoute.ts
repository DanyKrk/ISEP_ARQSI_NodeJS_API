import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITruckController from "../../controllers/IControllers/ITruckController";

import config from '../../../config';

const route = Router();

export default (app: Router) => {
    app.use('/trucks',route);

    const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

    route.post(
        '/post',
        celebrate({
            body: Joi.object({
                tare: Joi.number().required(),
                load_capacity: Joi.number().required(),
                maximum_battery_charge: Joi.number().required(),
                autonomy_when_fully_charged: Joi.number().required(),
                fast_charging_time: Joi.number().required()
            }),
        }),
        (req,res,next) => ctrl.createTruck(req,res,next),
    );

    route.get('/:idTruck' , (req, res, next) => { ctrl.getTruckById(req, res, next);req.params.idTruck})

    route.put('/update',celebrate({
        body: Joi.object({
            tare: Joi.number().required(),
            load_capacity: Joi.number().required(),
            maximum_battery_charge: Joi.number().required(),
            autonomy_when_fully_charged: Joi.number().required(),
            fast_charging_time: Joi.number().required()
        }),
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next),
    );

}
