import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IPathService from '../services/IServices/IPathService';
import IPathDTO from '../dto/IPathDTO';
import Path from '../persistence/schemas/pathSchema';
import { Result } from '../core/logic/Result';
import IPathController from './IControllers/IPathController';


@Service()
export default class PathController implements IPathController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.path.name) private pathServiceInstance : IPathService
  ) {}

  public async createPath(req: Request, res: Response, next: NextFunction) {
    try {
      const pathOrError = await this.pathServiceInstance.createPath(req.body as IPathDTO) as Result<IPathDTO>;
        
      if (pathOrError.isFailure) {
        return res.status(402).send();
      }

      const pathDTO = pathOrError.getValue();
      return res.json( pathDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async updatePath(req: Request, res: Response, next: NextFunction) {
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

  public async getPathById(req: Request, res: Response, next: NextFunction) {
    const pathId = req.params.pathId;

    return Path.findById(pathId)
        .then((path) => (path ? res.status(200).json({ path }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
    }

    public async getPaths(req: Request, res: Response, next: NextFunction) {
      return Path.find()
          .then((paths) => res.status(200).json({ paths }))
          .catch((error) => res.status(500).json({ error }));
  };

  }

