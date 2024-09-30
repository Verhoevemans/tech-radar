import { Component } from '@angular/core';

import { ButtonComponent } from '../../shared/components/common/button/button.component';
import { HeaderComponent } from '../../shared/components/core/header/header.component';
import { CreateRadarComponent } from './create/create-radar.component';
import { SelectRadarComponent } from './select-radar/select-radar.component';


@Component({
  selector: 'radar-start',
  standalone: true,
  imports: [
    ButtonComponent,
    CreateRadarComponent,
    HeaderComponent,
    SelectRadarComponent
  ],
  templateUrl: './start.component.html',
  styleUrl: './start.component.scss'
})
export class StartComponent {

}
