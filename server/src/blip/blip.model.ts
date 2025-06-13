import mongoose, { ObjectId } from 'mongoose';

import { IVotingResult, VotingResultSchema } from '../votes/votes.model';

const rings = ['hold', 'assess', 'trial', 'adopt'] as const;
export type Ring = (typeof rings)[number];

export interface IBlip {
    name: string;
    description: string;
    quadrant: string;
    ring: Ring;
    link: string;
    votingResults: IVotingResult[];
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
        required: [true, 'Blip Ring is required'],
        validate: [
            (ring: Ring) => rings.includes(ring),
            'Given value for Ring is of unknown type, must be "hold", "assess", "trial" or "adopt"'
        ]
    },
    link: {
        type: String
    },
    votingResults: {
        type: [VotingResultSchema],
        ref: 'votingResults'
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
