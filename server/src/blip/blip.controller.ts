import { NextFunction, Request, Response } from 'express';

import Radar from '../radar/radar.model';

import Blip, { IBlip } from './blip.model';

class BlipController {
    /*
    * @description  Get all Blips for a specific Radar
    * @path-param   radarName: string
    * @route        GET /api/radars/:radarName/blips
    **/
    public async getBlips(req: Request, res: Response, nexr: NextFunction): Promise<Response> {
        console.log('getBlips() - for Radar', req.params.radarName);

        let blips;
        let radar;

        try {
            radar = await Radar.findOne({ url: req.params.radarName });
        } catch (error) {
            console.log('failed to find Radar', error);
            return res.status(404).json({
                success: false
            });
        }

        try {
            blips = await Blip.find({ radar: radar!._id });
        } catch (error) {
            console.log('failed to find Blip', error);
            return res.status(404).json({
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            data: blips
        });
    }

    /*
    * @description  Create a new Blip for a given Radar
    * @path-param   radarName: string
    * @req-param    blip: object
    * @route        POST /api/radars/:radarName/blips
    **/
    public async createBlip(req: Request, res: Response, nexr: NextFunction): Promise<Response> {
        console.log(`createBlip() - for Radar ${req.params.radarName} with Blip: ${req.body.blip}`);

        let blip;
        let radar;

        try {
            radar = await Radar.findOne({ url: req.params.radarName });
            if (!radar) {
                throw new Error('No Radar found with given ID');
            }
        } catch (error) {
            console.log('failed to find Radar', error);
            return res.status(404).json({
                success: false
            });
        }

        try {
            blip = await Blip.create({ radar: radar!._id, ...req.body.blip })
        } catch (error) {
            console.log('failed to create Blip', error);
            return res.status(500).json({
                success: false
            });
        }

        return res.status(200).json({
            success: true,
            data: blip
        });
    };

    /*
    * @description  Update an existing Blip by Blip ID
    * @path-param   radarName: string
    * @path-param   id: string
    * @req-param    blip: object
    * @route        PUT /api/radars/:radarName/blips/:id
    **/
    public async updateBlip(req: Request, res: Response, nexr: NextFunction): Promise<Response> {
        console.log(`updateBlip() - for Radar ${req.params.radarName} with Blip: ${req.body.blip}`);

        let blip: IBlip | null;

        try {
            await Blip.findByIdAndUpdate(req.params.id, req.body.blip);
            blip = await Blip.findById(req.params.id);
        } catch (error) {
            console.log('failed to update Blip', req.body.blip.name, error);
            return res.status(500).json({
                success: false,
                error
            });
        }

        return res.status(200).json({
            success: true,
            data: blip
        });
    }
}

export default new BlipController();
