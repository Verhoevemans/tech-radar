export const rings = ['hold', 'assess', 'trial', 'adopt'] as const;
export type Ring = (typeof rings)[number];

export interface Blip {
  name: string,
  description?: string,
  quadrant: string,
  ring: Ring,
  link?: string
}
