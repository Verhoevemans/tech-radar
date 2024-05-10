import { Component, Input } from '@angular/core';

import { HeaderComponent } from '../../components/core/header/header.component';

@Component({
  selector: 'rad-radar',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './radar.component.html',
  styleUrl: './radar.component.scss'
})
export class RadarComponent {
  @Input()
  public domain!: string;

  public get headerTitle(): string {
    return `${this.domain.toUpperCase()} Radar`;
  }
}
