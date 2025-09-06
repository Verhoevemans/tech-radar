import mongoose from 'mongoose';
import WebSocket from 'ws';

import { Ring } from '../blip/blip.model';

export interface Connection {
    websocket: WebSocket;
    vote?: Ring;
}

export interface Session {
    url: string;
    connections: Connection[];
    blipId?: string;
}

export interface IVotingResult {
    votes: (Ring | undefined)[];
    comment?: string;
    result: Ring;
}

export type VotingEventType = 'start' | 'stop' | 'vote';

export type VotingEvent =
    | VotingEventStart
    | VotingEventStop
    | VotingEventVote;

export interface VotingEventBase {
    type: VotingEventType;
    participants: number;
    votes: (Ring | undefined)[];
}

export interface VotingEventStart extends VotingEventBase {
    type: 'start';
    blipId: string;
}

export interface VotingEventStop extends VotingEventBase {
    type: 'stop';
}

export interface VotingEventVote extends VotingEventBase {
    type: 'vote';
    vote: Ring;
}

export const VotingResultSchema = new mongoose.Schema<IVotingResult>({
    votes: {
        type: [String]
    },
    comment: {
        type: String
    },
    result: {
        type: String,
        required: [true, 'Vote Result is required']
    }
});

export default mongoose.model<IVotingResult>('VotingResult', VotingResultSchema);
