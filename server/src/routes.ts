import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload'
import OrphanagesController from './controllers/OrphanagesController'

const route = Router();
const upload = multer(uploadConfig);

route.post('/orphanages', upload.array('images'), OrphanagesController.create);

route.get('/orphanages/:id', OrphanagesController.show);
route.get('/orphanages', OrphanagesController.index);

export default route;
