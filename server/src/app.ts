import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express, { Express } from 'express';

import * as process from 'process';
import radarRoute from './radar/radar.route';
import connectDatabase from './utils/database';

dotenv.config({ path: `${__dirname}/config/config.env` });

connectDatabase();

const app: Express = express();

app.use(bodyParser.json());

app.use('/api/radars', radarRoute);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${ process.env.NODE_ENV } mode on port ${ PORT }`);
});
