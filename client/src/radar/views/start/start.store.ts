import { computed, Injectable, signal } from '@angular/core';

import { Radar } from '../../shared/models/radar.model';

export type Status = 'loading' | 'success' | 'error';

export interface StartState {
  radars: Radar[];
  status: Status
}

@Injectable({
  providedIn: 'root'
})
export class StartStore {
  // State
  private readonly startState = signal<StartState>({
    radars: [],
    status: 'success'
  });

  // Selectors
  public radars = computed(() => this.startState().radars);
  public status = computed(() => this.startState().status);

  // Reducers
  public setRadars(radars: Radar[]): void {
    this.startState.update(state => ({
      ...state,
      radars
    }));
  }

  public setStatus(status: Status) {
    this.startState.update((state) => ({
      ...state,
      status
    }));
  }
}
