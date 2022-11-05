import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    /**
   * Your favorite port
   */
    port: parseInt(process.env.SERVER_PORT, 10) || 5001,

    /**
   * That long string from mlab
   */
    databaseURL:
    process.env.MONGODB_URI ||
    '',

    /**
   * Your secret sauce
   */
    jwtSecret: process.env.MONGO_PASSWORD || '',

    /**
   * Used by winston logger
   */
    logs: {
        level: process.env.MONGO_USERNAME || 'info',
    },

    /**
   * API configs
   */
    api: {
        prefix: '/api',
    },

    controllers: {
        path: {
            name: 'PathController',
            path: '../controllers/pathController',
        },
        truck: {
            name: 'TruckController',
            path: '../controllers/truckController',
        },
    },

    repos: {
        path: {
            name: 'PathRepo',
            path: '../repos/pathRepo',
        },
        truck: {
            name: 'TruckRepo',
            path: '../repos/truckRepo',
        },
    },

    services: {
        path: {
            name: 'PathService',
            path: '../services/pathService',
        },
        truck: {
            name: 'TruckService',
            path: '../services/truckService',
        },
    },
};
