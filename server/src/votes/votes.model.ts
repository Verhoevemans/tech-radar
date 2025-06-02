import WebSocket from 'ws';

export interface Session {
    url: string;
    connections: WebSocket[];
    blipId?: string;
}

export type VotingEventType = 'start' | 'stop' | 'vote';

export type VotingEvent =
    | VotingEventStart
    | VotingEventStop
    | VotingEventVote;

export interface VotingEventBase {
    participants: number;
    type: VotingEventType;
    blipId: string;
}

export interface VotingEventStart extends VotingEventBase {
    type: 'start';
}

export interface VotingEventStop extends VotingEventBase {
    type: 'stop';
}

export interface VotingEventVote extends VotingEventBase {
    type: 'vote';
    vote: string;
}
