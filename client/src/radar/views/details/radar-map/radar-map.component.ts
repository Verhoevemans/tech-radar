import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Blip, Ring } from '../../../shared/models/blip.model';
import { Radar } from '../../../shared/models/radar.model';
import { RadarDetailsService } from '../radar-details.service';

@Component({
  selector: 'radar-map',
  standalone: true,
  templateUrl: './radar-map.component.html',
  styleUrl: './radar-map.component.scss'
})
export class RadarMapComponent implements OnChanges, OnInit {
  @Input({ required: true })
  public radar: Radar | undefined;

  public blipPositions = new Map<string, { x: number, y: number }>();
  public higlightedBlipId: string | undefined;

  constructor(private readonly radarDetailsService: RadarDetailsService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['radar'].currentValue) {
      this.setBlipPositions();
    }
  }

  public ngOnInit(): void {
    this.radarDetailsService.highlightedBlipId.subscribe((id) => {
      this.higlightedBlipId = id;
    })
  }

  public getBlipPosition(blip: Blip): string {
    const blipPosition = this.blipPositions.get(blip.id);
    if (blipPosition) {
      return `translate(${blipPosition.x}, ${blipPosition.y})`;
    } else {
      return 'scale(0)';
    }
  }

  public onBlipHover(id: string | undefined): void {
    this.radarDetailsService.highLightBlip(id);
  }

  private setBlipPositions(): void {
    this.radar?.blips.forEach((blip) => {
      const radius = this.getBlipPositionRadius(blip.ring);
      const angle = this.getBlipPositionAngle(blip.quadrant);
      if (radius !== undefined && angle !== undefined) {
        const x = radius * Math.sin(angle);
        const y = radius * Math.cos(angle);
        this.blipPositions.set(blip.id, { x, y });
      }
    })
  }

  private getBlipPositionAngle(quadrant: string): number | undefined {
    switch (this.radar?.quadrants.indexOf(quadrant)) {
      case 0:
        return (Math.random() * 80 + 185) * Math.PI / 180;
      case 1:
        return (Math.random() * 80 + 95) * Math.PI / 180;
      case 2:
        return (Math.random() * 80 + 275) * Math.PI / 180;
      case 3:
        return (Math.random() * 80 + 5) * Math.PI / 180;
      default:
        console.error(`Cannot determine position of Blip with unknown quadrant: ${quadrant}`);
        return undefined;
    }
  }

  private getBlipPositionRadius(ring: Ring): number| undefined {
    switch (ring) {
      case 'adopt':
        return Math.floor(Math.random() * 29) + 3;
      case 'trial':
        return Math.floor(Math.random() * 19) + 35;
      case 'assess':
        return Math.floor(Math.random() * 19) + 57;
      case 'hold':
        return Math.floor(Math.random() * 19) + 79;
      default:
        console.error(`Cannot determine position of Blip with unknown Ring value: ${ring}`);
        return undefined;
    }
  }
}
