import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
    const mongoConnection = await mongooseLoader();
    Logger.info('✌️ DB loaded and connected!');


    const pathSchema = {
    // compare with the approach followed in repos and services
        name: 'pathSchema',
        schema: '../persistence/schemas/pathSchema',
    };

    const truckSchema = {
        name: 'truckSchema',
        schema: '../persistence/schemas/truckSchema',
    };



    const pathController = {
        name: config.controllers.path.name,
        path: config.controllers.path.path,
    };

    const truckController = {
        name: config.controllers.truck.name,
        path: config.controllers.truck.path,
    };



    const pathRepo = {
        name: config.repos.path.name,
        path: config.repos.path.path,
    };

    const truckRepo = {
        name: config.repos.truck.name,
        path: config.repos.truck.path,
    };


    const pathService = {
        name: config.services.path.name,
        path: config.services.path.path,
    };

    const truckService = {
        name: config.services.truck.name,
        path: config.services.truck.path,
    };

    await dependencyInjectorLoader({
        mongoConnection,
        schemas: [pathSchema,truckSchema],
        controllers: [pathController,truckController],
        repos: [ pathRepo, truckRepo],
        services: [ pathService, truckService],
    });
    Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

    await expressLoader({ app: expressApp });
    Logger.info('✌️ Express loaded');
};
