import express from 'express';
import WebSocket from 'ws';

import { Session, VotingEvent, VotingEventStart, VotingEventVote } from './votes.model';

const sessions:  Session[] = [];

class VotesController {
    public constructor() {
        this.votes = this.votes.bind(this);
    }

    /*
    * @description  Create WebSocket Connection and event listeners
    * @path-param   radarName: string
    * @route        WS /api/radars/:radarName/votes
    **/
    public votes(websocket: WebSocket, req: express.Request): void {
        console.log('votes() - for Radar', req.params.radarName);

        const radarName: string = req.params.radarName;
        const session = sessions.find(session => session.url === radarName);

        if (session) {
            session.connections.push(websocket);
        } else {
            sessions.push({ url: radarName, connections: [websocket] });
        }

        if (session?.blipId) {
            const response: VotingEventStart = {
                participants: session.connections.length,
                type: 'start',
                blipId: session.blipId
            };
            websocket.send(JSON.stringify(response));
        }

        websocket.on('message', (websocketData, isBinary) => {
            console.log('websocket message received', websocketData);

            const data: VotingEvent = JSON.parse(websocketData.toString());
            const session = sessions.find(session => session.url === radarName)!;

            switch (data.type) {
                case 'start':
                    this.handleStartEvent(data, session);
                    break;
                case 'vote':
                    this.handleVoteEvent(data, session);
                    break;
                case 'stop':
                default:
                    this.handleStopEvent(session);
            }
        });

        websocket.on('close', () => {
            console.log('websocket connection closed');
            const connections = sessions.find(session => session.url === radarName)?.connections;
            connections?.splice(connections?.indexOf(websocket), 1);
            // TODO: figure out how to remove a vote from a user that leaves the session?
        });
    }

    private handleStartEvent(data: VotingEventStart, session: Session): void {
        session.blipId = data.blipId;
        const response = { ...data, participants: session.connections.length };
        session.connections.forEach(connection => {
            connection.send(JSON.stringify(response));
        });
    }

    private handleStopEvent(session: Session): void {
        session.blipId = undefined;
    }

    private handleVoteEvent(data: VotingEventVote, session: Session): void {
        const response = { ...data, participants: session.connections.length };
        session.connections.forEach(connection => {
            connection.send(JSON.stringify(response));
        });
    }
}

export default new VotesController();