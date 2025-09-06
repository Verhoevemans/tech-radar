import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { environment } from '../../../../environments/environment';
import { Blip, BlipAPIResponse, Ring } from '../../../shared/models/blip.model';
import { VotingEvent, VotingResult } from '../../../shared/models/vote.model';
import { RadarDetailsStore } from '../radar-details.store';

@Injectable({
  providedIn: 'root'
})
export class BlipVotesService {
  private votingConnection: WebSocketSubject<VotingEvent> | undefined;

  constructor(private readonly httpClient: HttpClient,
              private readonly store: RadarDetailsStore) {}

  public createVotingConnection(radarName: string): Observable<VotingEvent> {
    this.votingConnection = webSocket(`${environment.websocketUrl}/api/radars/${radarName}/votes`);

    return this.votingConnection.pipe(
      tap(event => {
        if (event.votes) {
          this.store.state.update('votes', event.votes);
        }
      })
    );
  }

  public saveVotesForBlip(votingResult: VotingResult, radarUrl: string, blipId: string): Observable<Blip> {
    return this.httpClient
      .put<BlipAPIResponse>(`${environment.apiUrl}/api/radars/${radarUrl}/votes/blips/${blipId}`, { votingResult })
      .pipe(
        map(response => response.data)
      );
  }

  public sendVote(vote?: Ring): void {
    this.votingConnection && this.votingConnection.next({ type: 'vote', vote });
  }

  public startVotingSession(blipId: string): void {
    this.store.state.update('votingSessionStartedByUser', true);
    this.votingConnection && this.votingConnection.next({ type: 'start', blipId });
  }

  public stopVotingSession(): void {
    this.votingConnection && this.votingConnection.next({ type: 'stop' });
  }
}
