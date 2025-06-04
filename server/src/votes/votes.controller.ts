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
            session.connections.push({ websocket });
        } else {
            sessions.push({ url: radarName, connections: [{ websocket }] });
        }

        if (session?.blipId) {
            const response: VotingEventStart = {
                type: 'start',
                blipId: session.blipId,
                participants: session.connections.length,
                votes: session.connections.map(connection => connection.vote)
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
                    this.handleVoteEvent(data, session, websocket);
                    break;
                case 'stop':
                default:
                    this.handleStopEvent(session);
            }
        });

        websocket.on('close', () => {
            console.log('websocket connection closed');

            const session = sessions.find(session => session.url === radarName)!;
            const connection = session.connections.filter(connection => connection.websocket === websocket)[0];
            session.connections.splice(session.connections.indexOf(connection), 1);

            const response = {
                participants: session.connections.length,
                votes: session.connections.map(connection => connection.vote)
            };

            session.connections.forEach(connection => {
                connection.websocket.send(JSON.stringify(response));
            });
        });
    }

    private handleStartEvent(data: VotingEventStart, session: Session): void {
        session.blipId = data.blipId;

        const response = { ...data, participants: session.connections.length };

        session.connections.forEach(connection => {
            connection.websocket.send(JSON.stringify(response));
        });
    }

    private handleStopEvent(session: Session): void {
        session.blipId = undefined;
        session.connections.forEach(connection => connection.vote = undefined);
    }

    private handleVoteEvent(data: VotingEventVote, session: Session, websocket: WebSocket): void {
        const connection = session.connections.find(connection => connection.websocket === websocket)!;
        connection.vote = data.vote;

        const response = {
            ...data,
            participants: session.connections.length,
            votes: session.connections.map(connection => connection.vote)
        };

        session.connections.forEach(connection => {
            connection.websocket.send(JSON.stringify(response));
        });
    }
}

export default new VotesController();