import {
  Component,
  effect,
  inject,
  input,
  output,
  Signal
} from '@angular/core';

import { Blip, BlipPosition, Ring } from '../../../shared/models/blip.model';
import { Radar } from '../../../shared/models/radar.model';
import { RadarDetailsStore } from '../radar-details.store';

@Component({
  selector: 'radar-map',
  templateUrl: './radar-map.component.html',
  styleUrl: './radar-map.component.scss'
})
export class RadarMapComponent {
  private readonly store: RadarDetailsStore = inject(RadarDetailsStore);

  public radar = input.required<Radar | undefined>();
  public openBlipDetails = output<Blip>();

  public blipPositions = new Map<string, BlipPosition>();
  public higlightedBlipId: Signal<string | undefined> = this.store.state.select(state => state.highlightedBlipId());

  constructor() {
    effect(() => {
      this.setBlipPositions(this.radar()?.blips || []);
    });
  }

  public getBlipClass(blip: Blip): string {
    let blipClass = 'radar-map__blip';
    if (!blip.ring) {
      blipClass = blipClass.concat(' uncategorized');
    }

    return blipClass;
  }

  public getBlipPosition(blip: Blip): string {
    const blipPosition = this.blipPositions.get(blip.id);
    if (blipPosition) {
      return `translate(${blipPosition.x}, ${blipPosition.y})`;
    } else {
      return 'scale(0)';
    }
  }

  public getHighlightClass(blip: Blip): string {
    let highlightClass = 'radar-map__highlight';
    if (blip.id === this.higlightedBlipId()) {
      highlightClass = highlightClass.concat(' highlighted');
    }
    if (!blip.ring) {
      highlightClass = highlightClass.concat(' uncategorized');
    }

    return highlightClass;
  }

  public onBlipHover(id: string | undefined): void {
    this.store.state.update('highlightedBlipId', id);
  }

  public onBlipClick(blip: Blip): void {
    this.openBlipDetails.emit(blip);
  }

  private setBlipPositions(blips: Blip[]): void {
    blips.forEach((blip) => {
      const blipPosition = this.calculateBlipPosition(blip);
      if (blipPosition) {
        this.blipPositions.set(blip.id, blipPosition);
      }
    })
  }

  private calculateBlipPosition(blip: Blip): BlipPosition | undefined {
    const radius = this.getBlipPositionRadius(blip.ring);
    const angle = this.getBlipPositionAngle(blip.quadrant, blip.ring);

    if (angle !== undefined) {
      const x = Math.floor(radius * Math.sin(angle));
      const y = Math.floor(radius * Math.cos(angle));

      if (!this.isDuplicateBlipPosition(x, y)) {
        return { x, y };
      } else {
        return this.calculateBlipPosition(blip);
      }
    } else {
      return undefined;
    }
  }

  private isDuplicateBlipPosition(x: number, y: number): boolean {
    const coordinates = Array.from(this.blipPositions.values());
    return coordinates.some(coordinate => {
      return coordinate.x && coordinate.y
        && (x === coordinate.x - 2 || x === coordinate.x - 1 || x === coordinate.x || x === coordinate.x + 1 || x === coordinate.x + 2)
        && (y === coordinate.y - 2 || y === coordinate.y - 1 || y === coordinate.y || y === coordinate.y + 1 || y === coordinate.y + 2);
    });
  }

  private getBlipPositionAngle(quadrant: string, ring?: Ring): number | undefined {
    const randomAngle: number = ring
      ? Math.random() * 80 // Set random angle between 0 and 80 degrees
      : (Math.random() * 20) + 30; // Set random angle between 30 and 50 degrees

    switch (this.radar()?.quadrants.indexOf(quadrant)) {
      case 0:
        return (randomAngle + 185) * Math.PI / 180;
      case 1:
        return (randomAngle + 95) * Math.PI / 180;
      case 2:
        return (randomAngle + 275) * Math.PI / 180;
      case 3:
        return (randomAngle + 5) * Math.PI / 180;
      default:
        console.error(`Cannot determine position of Blip with unknown quadrant: ${quadrant}`);
        return undefined;
    }
  }

  private getBlipPositionRadius(ring?: Ring): number {
    switch (ring) {
      case 'adopt':
        return Math.floor(Math.random() * 29) + 3;
      case 'trial':
        return Math.floor(Math.random() * 19) + 35;
      case 'assess':
        return Math.floor(Math.random() * 19) + 57;
      case 'hold':
        return Math.floor(Math.random() * 19) + 79;
      case undefined:
      default:
        // If Ring is undefined, radius will be higher than 105 and Blip will be positioned outside of Radar map
        return Math.floor(Math.random() * 25) + 105;
    }
  }
}
