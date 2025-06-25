import { Injectable } from '@angular/core';

import { Radar } from '../../shared/models/radar.model';
import { createStore } from '../../shared/utils/store';

export type Status = 'loading' | 'success' | 'error';

@Injectable({
  providedIn: 'root'
})
export class StartStore {
  public readonly state = createStore({
    radars: [] as Radar[],
    status: 'success' as Status
  });
}
