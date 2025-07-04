import { Injectable } from '@angular/core';

import { Radar } from '../../shared/models/radar.model';
import { createStore, Store } from '../../shared/utils/store';

export type Status = 'loading' | 'success' | 'error';

interface StartState {
  radars: Radar[],
  status: Status
}

@Injectable({
  providedIn: 'root'
})
export class StartStore {
  public readonly state: Store<StartState> = createStore({
    radars: [],
    status: 'success'
  });
}
