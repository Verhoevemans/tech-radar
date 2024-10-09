import { Router } from 'express';

import BlipController from './blip.controller';

const router = Router({ mergeParams: true });

router.route('/')
    .get(BlipController.getBlips)
    .post(BlipController.createBlip);

export default router;
