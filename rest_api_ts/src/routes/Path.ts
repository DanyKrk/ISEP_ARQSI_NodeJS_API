import express from 'express';
import controller from '../controllers/Path';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.path.create), controller.createPath);
router.get('/get/:pathId', controller.readPath);
router.get('/get/', controller.readAllPaths);
router.patch('/update/:pathId', ValidateSchema(Schemas.path.update), controller.updatePath);
router.delete('/delete/:pathId', controller.deletePath);

export = router;
