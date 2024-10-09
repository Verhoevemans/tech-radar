import mongoose, { ObjectId } from 'mongoose';

export type Ring = 'hold' | 'assess' | 'trial' | 'adopt';

export interface IBlip {
    name: string;
    description: string;
    quadrant: string;
    ring: Ring;
    link: string;
    radar: ObjectId
}

const BlipSchema = new mongoose.Schema<IBlip>({
    name: {
        type: String,
        required: [true, 'Blip Name is required']
    },
    description: {
        type: String
    },
    quadrant: {
        type: String,
        required: [true, 'Blip Quadrant is required']
    },
    ring: {
        type: String,
        required: [true, 'Blip Ring is required']
    },
    link: {
        type: String
    },
    radar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Radar',
        required: true
    }
}, {
    toJSON: { virtuals: true }
});

export default mongoose.model<IBlip>('Blip', BlipSchema);
