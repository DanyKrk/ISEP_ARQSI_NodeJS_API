import { Request, Response, NextFunction } from 'express';

export default interface IPathController {
    createPath(req: Request, res: Response, next: NextFunction);
    updatePath(req: Request, res: Response, next: NextFunction);
    getPathById(req: Request, res: Response, next: NextFunction);
}
