import { Router } from 'express';
import path from './routes/pathRoute';
import truck from './routes/truckRoute';

export default () => {
    const app = Router();

    path(app);
    truck(app);

    return app;
};
