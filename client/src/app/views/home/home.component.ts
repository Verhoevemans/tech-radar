import { Component } from '@angular/core';

import { ButtonComponent } from '../../components/common/button/button.component';
import { HeaderComponent } from '../../components/core/header/header.component';

import { CreateRadarComponent } from './create-radar/create-radar.component';
import { FindRadarComponent } from './find-radar/find-radar.component';
import { SelectRadarComponent } from './select-radar/select-radar.component';

@Component({
  selector: 'rad-home',
  standalone: true,
  imports: [
    ButtonComponent,
    HeaderComponent,
    SelectRadarComponent,
    FindRadarComponent,
    CreateRadarComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
