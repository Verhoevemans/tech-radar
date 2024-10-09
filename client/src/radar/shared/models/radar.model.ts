import { Blip } from './blip.model';

export interface Radar {
  name: string,
  url: string,
  quadrants: string[],
  blips: Blip[]
}
