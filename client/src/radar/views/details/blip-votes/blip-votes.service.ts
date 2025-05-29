import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { Ring } from '../../../shared/models/blip.model';
import { VotingEvent } from '../../../shared/models/vote.model';

@Injectable({
  providedIn: 'root'
})
export class BlipVotesService {
  private votingConnection: WebSocketSubject<VotingEvent> | undefined;

  public createVotingConnection(radarName: string): WebSocketSubject<VotingEvent> {
    this.votingConnection = webSocket(`ws://localhost:3000/api/radars/${radarName}/votes`);
    return this.votingConnection;
  }

  public startVotingSession(blipId: string): void {
    this.votingConnection && this.votingConnection.next({ type: 'start', blipId });
  }

  public stopVotingSession(): void {
    this.votingConnection && this.votingConnection.complete();
  }

  public sendMessage(message: string): void {
    this.votingConnection && this.votingConnection.next({ type: 'message', message });
  }

  public sendVote(vote: Ring): void {
    this.votingConnection && this.votingConnection.next({ type: 'vote', vote });
  }
}
