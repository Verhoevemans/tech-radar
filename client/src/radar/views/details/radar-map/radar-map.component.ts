import { Component, Input } from '@angular/core';

import { Blip } from '../../../shared/models/blip.model';
import { Radar } from '../../../shared/models/radar.model';

@Component({
  selector: 'radar-map',
  standalone: true,
  templateUrl: './radar-map.component.html',
  styleUrl: './radar-map.component.scss'
})
export class RadarMapComponent {
  @Input({ required: true })
  public radar: Radar | undefined;

  public getPosition(blip: Blip): string {
    switch (this.radar?.quadrants.indexOf(blip.quadrant)) {
      case 0:
        return `translate(${-50}, ${-50})`;
      case 1:
        return `translate(${50}, ${-50})`;
      case 2:
        return `translate(${-50}, ${50})`;
      case 3:
      default:
        return `translate(${50}, ${50})`;
    }
  }
}
