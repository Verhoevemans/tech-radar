import { Ring } from './blip.model';

export type Vote = Ring | undefined;

export type VotingEvent =
  | VotingEventSessionStart
  | VotingEventSessionStop
  | VotingEventVote;

interface VotingEventBase {
  type: VotingEventType;
  votes?: Vote[];
}

export type VotingEventType = 'start' | 'stop' | 'vote';

export interface VotingEventSessionStart extends VotingEventBase {
  type: 'start';
  blipId: string;
}

export interface VotingEventSessionStop extends VotingEventBase {
  type: 'stop';
}

export interface VotingEventVote extends VotingEventBase {
  type: 'vote';
  vote?: Ring;
}
