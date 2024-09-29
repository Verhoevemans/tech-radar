import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// import { StartComponent } from './views/home/start.component';
// import { RadarComponent } from './views/radar/radar.component';
import { ModalComponent } from './components/common/modal/modal.component';

@Component({
  selector: 'radar-root',
  standalone: true,
  imports: [RouterOutlet, ModalComponent],
  templateUrl: './radar.component.html',
  styleUrl: './radar.component.scss'
})
export class RadarComponent {}
