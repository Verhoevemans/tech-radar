import { NextFunction, Request, Response } from 'express';

import Radar from './radar.model';

class RadarController {
    public async getRadars(req: Request, res: Response, next: NextFunction): Promise<Response> {
        console.log('getRadars()');

        const radars = await Radar.find();

        return res.status(200).json({
            success: true,
            count: radars.length,
            data: radars
        });
    }

    public async createRadar(req: Request, res: Response, next: NextFunction): Promise<Response> {
        console.log('createRadar()', req.params, req.body);

        let radar;

        try {
            radar = await Radar.create({
                name: req.body.name,
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

    public async getRadar(req: Request, res: Response, next: NextFunction): Promise<Response> {
        console.log('getRadar() - with ID', req.params.radarId);
        const radar = {
            name: 'Front-end',
            quadrants: ['Languages & Frameworks', 'Platforms', 'Tools', 'Techniques'],
            blips: [
                { name: 'Angular', quadrant: 'Languages & Frameworks', ring: 'Adopt' },
                { name: 'React', quadrant: 'Languages & Frameworks', ring: 'Assess' },
                { name: 'NodeJS', quadrant: 'Platforms', ring: 'Adopt' },
                { name: 'Jest', quadrant: 'Tools', ring: 'Adopt' },
                { name: 'Webpack', quadrant: 'Tools', ring: 'Assess' },
                { name: 'Web Components', quadrant: 'Techniques', ring: 'Assess' }
            ]
        };

        return res.status(200).json({
            success: true,
            data: radar
        });
    }
}

export default new RadarController();
