import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  public constructor(private readonly router: Router) {}

  public openRadar(radar: string): void {
    this.router.navigate(['radar', radar.toLowerCase()]);
  }
}
