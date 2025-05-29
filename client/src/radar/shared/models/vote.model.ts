import { Ring } from './blip.model';

export type VotingEvent =
  | VotingEventSessionStart
  | VotingEventSessionStop
  | VotingEventVote
  | VotingEventMessage;

interface VotingEventBase {
  type: VotingEventType;
}

export type VotingEventType = 'start' | 'stop' | 'vote' | 'message';

export interface VotingEventSessionStart extends VotingEventBase {
  type: 'start';
  blipId: string;
}

export interface VotingEventSessionStop extends VotingEventBase {
  type: 'stop';
}

export interface VotingEventVote extends VotingEventBase {
  type: 'vote';
  vote: Ring;
}

export interface VotingEventMessage extends VotingEventBase {
  type: 'message';
  message: string;
}
