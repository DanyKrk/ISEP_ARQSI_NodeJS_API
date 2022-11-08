import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import ITruckService from "../services/IServices/ITruckService";
import ITruckDTO from "../dto/ITruckDTO";

import { Result } from '../core/logic/Result';
import ITruckController from "./IControllers/ITruckController";
import Truck from '../persistence/schemas/truckSchema';


@Service()
export default class TruckController implements ITruckController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.truck.name) private truckServiceInstance : ITruckService
  ) {}

  public async createTruck(req: Request, res: Response, next: NextFunction) {
    try {
      const truckOrError = await this.truckServiceInstance.createTruck(req.body as ITruckDTO) as Result<ITruckDTO>;
        
      if (truckOrError.isFailure) {
        return res.status(402).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.json( truckDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updateTruck(req: Request, res: Response, next: NextFunction) {
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

  public async getTruckById(req: Request, res: Response, next: NextFunction) {
    const truckId = req.params.truckId;

    return Truck.findById(truckId)
        .then((truck) => (truck ? res.status(200).json({ truck }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
    }

    public async getTrucks(req: Request, res: Response, next: NextFunction) {
      return Truck.find()
          .then((trucks) => res.status(200).json({ trucks }))
          .catch((error) => res.status(500).json({ error }));
  };
}
