import * as mongoose from 'mongoose';

interface IRadar {
    name: string;
    quadrants: string[];
}

const RadarSchema = new mongoose.Schema<IRadar>({
    name: {
        type: String,
        required: [true, 'Radar Name is required']
    },
    quadrants: {
        type: [String],
        required: [true, 'Radar Quadrants are required'],
        validate: [
            (quadrants: string[]) => quadrants.filter(entry => entry !== '').length === 4,
            'A Radar must have 4 Quadrants'
        ]
    }
});

export default mongoose.model<IRadar>('Radar', RadarSchema);
