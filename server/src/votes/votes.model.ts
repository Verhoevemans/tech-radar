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

export type VotingEventType = 'start' | 'stop' | 'vote';

export type VotingEvent =
    | VotingEventStart
    | VotingEventStop
    | VotingEventVote;

export interface VotingEventBase {
    type: VotingEventType;
    blipId: string;
    participants: number;
    votes: (Ring | undefined)[];
}

export interface VotingEventStart extends VotingEventBase {
    type: 'start';
}

export interface VotingEventStop extends VotingEventBase {
    type: 'stop';
}

export interface VotingEventVote extends VotingEventBase {
    type: 'vote';
    vote: Ring;
}
