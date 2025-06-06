import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { Ring } from '../../../shared/models/blip.model';
import { VotingEvent, VotingResults } from '../../../shared/models/vote.model';

@Injectable({
  providedIn: 'root'
})
export class BlipVotesService {
  private votingConnection: WebSocketSubject<VotingEvent> | undefined;
  private votingResults = new BehaviorSubject<VotingResults>({ votes: [] });

  public createVotingConnection(radarName: string): Observable<VotingEvent> {
    this.votingConnection = webSocket(`ws://localhost:3000/api/radars/${radarName}/votes`);
    return this.votingConnection.pipe(
      tap(event => {
        if ((event.type === 'start' || event.type === 'vote') && event.votes) {
          this.votingResults.next({ votes: event.votes });
        }
      })
    );
  }

  public getVotingResults(): BehaviorSubject<VotingResults> {
    return this.votingResults;
  }

  public startVotingSession(blipId: string): void {
    this.votingConnection && this.votingConnection.next({ type: 'start', blipId });
  }

  public stopVotingSession(): void {
    this.votingConnection && this.votingConnection.next({ type: 'stop' });
  }

  public sendVote(vote?: Ring): void {
    this.votingConnection && this.votingConnection.next({ type: 'vote', vote });
  }
}
