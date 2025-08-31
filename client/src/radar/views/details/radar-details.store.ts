import { Injectable } from '@angular/core';

import { Ring } from '../../shared/models/blip.model';
import { Radar } from '../../shared/models/radar.model';
import { Vote } from '../../shared/models/vote.model';
import { createStore, Store } from '../../shared/utils/store';

export type LoadingStatus = 'loading' | 'success' | 'error';

interface RadarDetailsState {
  highlightedBlipId: string | undefined,
  radar: Radar | undefined,
  radarUrl: string,
  loadingStatus: LoadingStatus,
  votingSessionBlipId: string | undefined,
  votingSessionSelectedRing: Ring | undefined,
  votingSessionStartedByUser: boolean,
  votes: Vote[]
}

@Injectable({
  providedIn: 'root'
})
export class RadarDetailsStore {
  public readonly state: Store<RadarDetailsState> = createStore({
    highlightedBlipId: undefined,
    radar: undefined,
    radarUrl: '',
    loadingStatus: 'success',
    votingSessionBlipId: undefined,
    votingSessionSelectedRing: undefined,
    votingSessionStartedByUser: false,
    votes: []
  });
}
