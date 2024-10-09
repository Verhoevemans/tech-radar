import { Router } from 'express';

import RadarController from './radar.controller';
import radarController from './radar.controller';

const router = Router();

router.route('/')
    .get(RadarController.getRadars)
    .post(RadarController.createRadar);

// TODO: add routes fot updateRadar and deleteRadar
router.route('/:radarName')
    .get(radarController.getRadar);

export default router;
