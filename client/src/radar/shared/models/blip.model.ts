export const rings = ['adopt', 'trial', 'assess', 'hold'] as const;
export type Ring = (typeof rings)[number];

export interface Blip {
  name: string,
  description?: string,
  quadrant: string,
  ring: Ring,
  link?: string
}
