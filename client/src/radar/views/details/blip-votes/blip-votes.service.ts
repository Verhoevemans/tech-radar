import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { Blip, BlipAPIResponse, Ring } from '../../../shared/models/blip.model';
import { VotingEvent } from '../../../shared/models/vote.model';
import { RadarDetailsStore } from '../radar-details.store';

@Injectable({
  providedIn: 'root'
})
export class BlipVotesService {
  private votingConnection: WebSocketSubject<VotingEvent> | undefined;

  constructor(private readonly httpClient: HttpClient,
              private readonly store: RadarDetailsStore) {}

  public createVotingConnection(radarName: string): Observable<VotingEvent> {
    this.votingConnection = webSocket(`ws://localhost:3000/api/radars/${radarName}/votes`);

    return this.votingConnection.pipe(
      tap(event => {
        if (event.votes) {
          this.store.state.update('votes', event.votes);
        }
      })
    );
  }

  public saveVotesForBlip(result: Ring, votes: (Ring | undefined)[], radarUrl: string, blipId: string): Observable<Blip> {
    const votingResult = { result, votes };

    return this.httpClient
      .put<BlipAPIResponse>(`api/radars/${radarUrl}/votes/blips/${blipId}`, { votingResult })
      .pipe(
        map(response => response.data)
      );
  }

  public sendVote(vote?: Ring): void {
    this.votingConnection && this.votingConnection.next({ type: 'vote', vote });
  }

  public startVotingSession(blipId: string): void {
    this.votingConnection && this.votingConnection.next({ type: 'start', blipId });
  }

  public stopVotingSession(): void {
    this.votingConnection && this.votingConnection.next({ type: 'stop' });
  }
}
