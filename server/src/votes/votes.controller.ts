import express from 'express';
import WebSocket from 'ws';

import { Session, VotesResponse } from './votes.model';

const sessions:  Session[] = [];

class VotesController {
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

        websocket.on('message', (websocketData, isBinary) => {
            console.log('websocket message received', websocketData);

            const connections = sessions.find(session => session.url === radarName)?.connections;
            console.log('number of clients on this route:', connections?.length);

            const data = JSON.parse(websocketData.toString());
            const response: VotesResponse = {
                participants: connections?.length || 0,
                type: data.type,
                blipId: data.blipId,
                vote: data.vote,
                message: data.message
            };

            connections?.forEach(connection => {
                connection.send(JSON.stringify(response));
            });
        });

        websocket.on('close', () => {
            console.log('websocket connection closed');
            const connections = sessions.find(session => session.url === radarName)?.connections;
            connections?.splice(connections?.indexOf(websocket), 1);
            // TODO: figure out how to remove a vote from a user that leaves the session?
        });
    }
}

export default new VotesController();