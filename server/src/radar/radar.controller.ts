import { NextFunction, Request, Response } from 'express';

import Radar from './radar.model';

class RadarController {
    /*
    * @description  Get all Radars
    * @route        GET /api/radars
    **/
    public async getRadars(req: Request, res: Response, next: NextFunction): Promise<Response> {
        console.log('getRadars()');

        const radars = await Radar.find();

        return res.status(200).json({
            success: true,
            count: radars.length,
            data: radars
        });
    }

    /*
    * @description  Create a new Radar
    * @req-param    name: string
    * @req-param    quadrants: string[]
    * @route        POST /api/radars
    **/
    public async createRadar(req: Request, res: Response, next: NextFunction): Promise<Response> {
        console.log('createRadar()', req.params, req.body);

        let radar;

        try {
            radar = await Radar.create({
                name: req.body.name,
                url: req.body.name
                    .toLowerCase()
                    .replace(/[^a-z0-9 -]/g, '')
                    .trim()
                    .replace(/\s+/g, '-'),
                description: req.body.description,
                quadrants: req.body.quadrants
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            data: radar
        });
    }

    /*
    * @description  Get a single Radar
    * @path-param   radarName: string
    * @route        GET /api/radars/:radarName
    **/
    public async getRadar(req: Request, res: Response, next: NextFunction): Promise<Response> {
        console.log('getRadar() - with ID', req.params.radarName);

        let radar;

        try {
            radar = await Radar.findOne({ url: req.params.radarName }).populate('blips');
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            data: radar
        });
    }
}

export default new RadarController();
