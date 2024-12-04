import { Router } from 'express';

import BlipController from './blip.controller';

const router = Router({ mergeParams: true });

router.route('/')
    .get(BlipController.getBlips)
    .post(BlipController.createBlip);

router.route('/:id')
    .put(BlipController.updateBlip);

export default router;
