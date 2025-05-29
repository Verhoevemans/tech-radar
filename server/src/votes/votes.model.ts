import WebSocket from 'ws';

export interface Session {
    url: string;
    connections: WebSocket[];
}

export interface VotesResponse {
    participants: number;
    type: string;
    blipId: string;
    vote?: string;
    message?: string;
}