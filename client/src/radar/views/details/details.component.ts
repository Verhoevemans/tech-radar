import { Component, Input } from '@angular/core';

import { HeaderComponent } from '../../components/core/header/header.component';

import { BlipListComponent } from './blip-list/blip-list.component';
import { RadarMapComponent } from './radar-map/radar-map.component';

@Component({
  selector: 'radar-details',
  standalone: true,
  imports: [
    HeaderComponent,
    RadarMapComponent,
    BlipListComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  @Input()
  public domain!: string;

  public radar = {
    name: 'Front-end',
    groups: ['Languages & Frameworks', 'Platforms', 'Tools', 'Techniques'],
    blips: [
      { name: 'Angular', group: 'Languages & Frameworks', position: 'Adopt' },
      { name: 'React', group: 'Languages & Frameworks', position: 'Assess' },
      { name: 'NodeJS', group: 'Platforms', position: 'Adopt' },
      { name: 'Jest', group: 'Tools', position: 'Adopt' },
      { name: 'Webpack', group: 'Tools', position: 'Assess' },
      { name: 'Web Components', group: 'Techniques', position: 'Assess' }
    ]
  };

  public get headerTitle(): string {
    return `${ this.domain.toUpperCase() } Radar`;
  }

  public getBlips(group: string): string[] {
    return this.radar.blips
      .filter((blip) => blip.group === group)
      .map((blip) => blip.name);
  }
}
