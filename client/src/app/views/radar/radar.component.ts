import { Component, Input } from '@angular/core';

import { AnalyzeComponent } from '../../components/core/analyze/analyze.component';

@Component({
  selector: 'radar-radar',
  standalone: true,
  imports: [
    AnalyzeComponent
  ],
  templateUrl: './radar.component.html',
  styleUrl: './radar.component.scss'
})
export class RadarComponent {
  @Input()
  public radarName!: string;
}
