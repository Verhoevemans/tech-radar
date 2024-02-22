import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { StartComponent } from './views/start/start.component';
import { MainComponent } from './views/main/main.component';

@Component({
  selector: 'radar-root',
  standalone: true,
  imports: [RouterOutlet, StartComponent, MainComponent],
  templateUrl: './radar.component.html',
  styleUrl: './radar.component.scss'
})
export class RadarComponent {}
