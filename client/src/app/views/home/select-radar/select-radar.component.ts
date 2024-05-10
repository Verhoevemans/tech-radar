import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/common/button/button.component';

@Component({
  selector: 'rad-select-radar',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './select-radar.component.html',
  styleUrl: './select-radar.component.scss'
})
export class SelectRadarComponent {
  public openRadar(): void {
    console.log('Navigate from here!');
  }
}
