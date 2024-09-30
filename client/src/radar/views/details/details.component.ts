import { Component, Input } from '@angular/core';

import { HeaderComponent } from '../../shared/components/core/header/header.component';

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
  public name!: string;

  public get headerTitle(): string {
    return `${ this.name.toUpperCase() } Radar`;
  }
}
