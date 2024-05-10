import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/common/button/button.component';

@Component({
  selector: 'rad-find-radar',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './find-radar.component.html',
  styleUrl: './find-radar.component.scss'
})
export class FindRadarComponent {
  // TODO: not the right name here.
  //  Should this method be in the parent component, since it is very similar to openRadar in SelectRadarComponent?
  public openRadar(): void {
    console.log('Navigate from here! But what happens when the name of the Radar is not found..?');
  }
}
