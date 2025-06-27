import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { Blip, BlipAPIResponse, Ring } from '../../../shared/models/blip.model';
import { VotingEvent, VotingResults } from '../../../shared/models/vote.model';
import { RadarDetailsStore } from '../radar-details.store';

@Injectable({
  providedIn: 'root'
})
export class BlipVotesService {
  private votingConnection: WebSocketSubject<VotingEvent> | undefined;
  // TODO: VotingResults is State!! So make Signal here...
  private votingResults = new BehaviorSubject<VotingResults>({ votes: [] });

  constructor(private readonly httpClient: HttpClient,
              private readonly store: RadarDetailsStore) {}

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

  public saveVotesForBlip(result: Ring, votes: (Ring | undefined)[], blipId: string): Observable<Blip> {
    const radarName = this.store.state.select(state => state.radar()).name;
    const votingResult = { result, votes };

    return this.httpClient
      .put<BlipAPIResponse>(`api/radars/${radarName}/votes/blips/${blipId}`, { votingResult })
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
