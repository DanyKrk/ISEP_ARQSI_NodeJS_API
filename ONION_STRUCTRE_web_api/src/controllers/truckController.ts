import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import ITruckService from "../services/IServices/ITruckService";
import ITruckDTO from "../dto/ITruckDTO";

import { Result } from '../core/logic/Result';
import ITruckController from "./IControllers/ITruckController";


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
    try {
      const truckOrError = await this.truckServiceInstance.updateTruck(req.body as ITruckDTO) as Result<ITruckDTO>;

      if (truckOrError.isFailure) {
        return res.status(404).send();
      }

      const truckDTO = truckOrError.getValue();
      return res.status(201).json( truckDTO );
    }
    catch (e) {
      return next(e);
    }
  };

  public async getTruckById(req: Request, res: Response, next: NextFunction) {
    try {
        let aux = req.url.substring(6,req.url.length);
  
        const truckOrError = (await this.truckServiceInstance.getTruck(aux)) as Result<ITruckDTO>;
  
        if (truckOrError.isFailure) {
          return res.status(402).send();
        }
  
        const truckDTO = truckOrError.getValue();
        return res.json(truckDTO).status(201);
      } catch (e) {
        return next(e);
      }
    }
}
