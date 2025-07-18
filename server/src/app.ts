import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';
import expressWs from 'express-ws';
import * as process from 'process';

import blipRoute from './blip/blip.route';
import radarRoute from './radar/radar.route';
import connectDatabase from './utils/database';

dotenv.config({ path: `${__dirname}/config/config.env` });

const PORT = process.env.PORT || 3000;

async function createApp() {
    connectDatabase();

    const { app, getWss } = expressWs(express());

    app.use(bodyParser.json());

    radarRoute.use('/:radarName/blips', blipRoute);
    radarRoute.use('/:radarName/votes', (await import('./votes/votes.route')).default);
    app.use('/api/radars', radarRoute);

    app.set('wss', getWss());

    const server = app.listen(PORT, () => {
        console.log(`Server running in ${ process.env.NODE_ENV } mode on port ${ PORT }`);
    });
}

createApp();
