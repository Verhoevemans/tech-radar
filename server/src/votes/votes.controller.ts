import { Request, Response } from 'express';
import WebSocket from 'ws';

import Blip, { IBlip } from '../blip/blip.model';

import { Session, VotingEvent, VotingEventStart, VotingEventVote, VotingResult } from './votes.model';

class VotesController {
    private sessions:  Session[] = [];

    public constructor() {
        this.votes = this.votes.bind(this);
    }

    /*
    * @description  Create WebSocket Connection and event listeners
    * @path-param   radarName: string
    * @route        WS /api/radars/:radarName/votes
    **/
    public votes(websocket: WebSocket, req: Request): void {
        console.log('votes() - for Radar', req.params.radarName);

        const radarName: string = req.params.radarName;
        const session = this.sessions.find(session => session.url === radarName);

        if (session) {
            session.connections.push({ websocket });
        } else {
            this.sessions.push({ url: radarName, connections: [{ websocket }] });
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
            const session = this.sessions.find(session => session.url === radarName)!;

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

            const session = this.sessions.find(session => session.url === radarName)!;
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

    /*
    * @description  Save vote results to Blip by Blip ID
    * @path-param   radarName: string
    * @path-param   id: string
    * @req-param    votingResult: object
    * @route        PUT /api/radars/:radarName/votes/blips/:id
    **/
    public async saveVotes(req: Request, res: Response): Promise<Response> {
        console.log(`saveVotes() - for Radar ${req.params.radarName} for Blip: ${req.params.id}`);

        let blip: IBlip | null;
        const votingResult = req.body.votingResult;

        try {
            await Blip.findByIdAndUpdate(req.params.id, {
                ring: votingResult.result,
                $push: { votingResults: votingResult }
            });
            blip = await Blip.findById(req.params.id);
        } catch (error) {
            console.log('failed to update Blip', req.params.id, error);
            return res.status(500).json({
                success: false,
                error
            });
        }

        return res.status(200).json({
            success: true,
            data: blip
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