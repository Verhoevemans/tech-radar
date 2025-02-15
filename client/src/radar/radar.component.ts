import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ModalComponent } from './shared/components/core/modal/modal.component';

@Component({
  selector: 'radar-root',
  standalone: true,
  imports: [RouterOutlet, ModalComponent],
  templateUrl: './radar.component.html',
  styleUrl: './radar.component.scss'
})
export class RadarComponent {}
