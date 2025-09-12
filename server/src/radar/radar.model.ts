import * as mongoose from 'mongoose';

import { IBlip } from '../blip/blip.model';

export interface IRadar {
    name: string;
    url: string;
    description: string;
    quadrants: string[];
    blips: IBlip[];
}

const RadarSchema = new mongoose.Schema<IRadar>({
    name: {
        type: String,
        required: [true, 'Radar Name is required']
    },
    url: {
        type: String,
        required: [true, 'Missing property Url'],
        unique: true
    },
    description: {
        type: String
    },
    quadrants: {
        type: [String],
        required: [true, 'Radar Quadrants are required'],
        validate: [
            (quadrants: string[]) => quadrants.filter(entry => entry !== '').length === 4,
            'A Radar must have 4 Quadrants'
        ]
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

RadarSchema.virtual('blips', {
    ref: 'Blip',
    localField: '_id',
    foreignField: 'radar',
    justOne: false
});

export default mongoose.model<IRadar>('Radar', RadarSchema);
