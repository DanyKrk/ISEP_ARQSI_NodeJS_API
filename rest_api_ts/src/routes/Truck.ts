import express from 'express';
import controller from '../controllers/Truck';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.truck.create), controller.createTruck);
router.get('/get/:truckId', controller.readTruck);
router.get('/get/', controller.readAllTrucks);
router.patch('/update/:truckId', ValidateSchema(Schemas.truck.update), controller.updateTruck);
router.delete('/delete/:truckId', controller.deleteTruck);

export = router;
