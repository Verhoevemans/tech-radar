import { Blip } from './blip.model';

export interface Radar {
  name: string,
  url: string,
  description?: string,
  quadrants: string[],
  blips: Blip[]
}

export interface RadarAPIResponse {
  success: boolean,
  data: Radar
}

export interface RadarsAPIResponse {
  success: boolean,
  data: Radar[]
}
