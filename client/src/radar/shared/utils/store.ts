import { computed, signal, Signal, WritableSignal } from '@angular/core';

// SignalState is an object where each property of the State is represented by a separate Signal
export type SignalState<STATE> = {
  [KEY in keyof STATE]: WritableSignal<STATE[KEY]>;
};

// Selector is a function that allows callers to select a specific property from the State object
type Selector<STATE, PROPERTY> = (state: STATE) => PROPERTY;

export interface Store<STATE> {
  select<PROPERTY>(selector: Selector<SignalState<STATE>, PROPERTY>): Signal<PROPERTY>;
  update<PROPERTY extends keyof STATE>(prop: PROPERTY, update: STATE[PROPERTY] | Selector<STATE[PROPERTY], STATE[PROPERTY]>): void
}

export function createStore<STATE extends Object>(state: STATE): Store<STATE> {
  const signalState = Object.fromEntries(
    Object.entries(state).map(([key, value]) => [key, signal(value)])
  ) as SignalState<STATE>;

  return {
    select<PROPERTY>(selector: Selector<typeof signalState, PROPERTY>): Signal<PROPERTY> {
      return computed(() => selector(signalState));
    },
    update<PROPERTY extends keyof STATE>(property: PROPERTY, update: STATE[PROPERTY] | Selector<STATE[PROPERTY], STATE[PROPERTY]>) {
      const subState = signalState[property];
      if (typeof update === 'function') {
        subState.update(update as (value: STATE[PROPERTY]) => STATE[PROPERTY])
      } else {
        subState.set(update);
      }
    }
  }
}
