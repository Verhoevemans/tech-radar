import { Injectable } from '@angular/core';

import { Radar } from '../../shared/models/radar.model';
import { Vote } from '../../shared/models/vote.model';
import { createStore, Store } from '../../shared/utils/store';

export type Status = 'loading' | 'success' | 'error';

interface RadarDetailsState {
  highlightedBlipId: string | undefined,
  radar: Radar | undefined,
  radarUrl: string,
  status: Status,
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
    status: 'success',
    votes: []
  });
}
