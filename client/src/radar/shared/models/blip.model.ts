export type Ring = 'hold' | 'assess' | 'trial' | 'adopt';

export interface Blip {
  name: string,
  description?: string,
  quadrant: string,
  ring: Ring,
  link?: string
}
