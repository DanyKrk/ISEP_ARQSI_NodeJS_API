import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPathController from '../../controllers/IControllers/IPathController';

import config from '../../../config';

const route = Router();

export default (app: Router) => {
    app.use('/paths',route);

    const ctrl = Container.get(config.controllers.path.name) as IPathController;

    route.post(
        '/post',
        celebrate({
            body: Joi.object({
                departure_warehouse: Joi.string().required(),
                arrival_warehouse: Joi.string().required(),
                distance: Joi.number().required(),
                time: Joi.number().required(),
                energy_used: Joi.number().required(),
                extra_time: Joi.number().required()
            }),
        }),
        (req,res,next) => ctrl.createPath(req,res,next),
    );
    
    route.get('' , (req, res, next) => { ctrl.getPaths(req, res, next); })
    
    route.get('/:pathId' , (req, res, next) => { ctrl.getPathById(req, res, next); })

    route.patch('/update/:pathId',celebrate({
        body: Joi.object({
            departure_warehouse: Joi.string().required(),
            arrival_warehouse: Joi.string().required(),
            distance: Joi.number().required(),
            time: Joi.number().required(),
            energy_used: Joi.number().required(),
            extra_time: Joi.number().required()
        }),
    }),
    (req, res, next) => ctrl.updatePath(req, res, next),
    );

}
