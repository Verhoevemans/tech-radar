import express from 'express';
import expressWs from 'express-ws';

import VotesController from './votes.controller';

const router = express.Router({ mergeParams: true }) as expressWs.Router;

router.ws('/', VotesController.votes);

router.route('/blips/:id')
    .put(VotesController.saveVotes);

export default router;