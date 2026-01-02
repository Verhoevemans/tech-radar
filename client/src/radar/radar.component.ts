import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ModalComponent } from './shared/components/core/modal/modal.component';

@Component({
    selector: 'radar-root',
    imports: [
        FontAwesomeModule,
        ModalComponent,
        RouterOutlet
    ],
    templateUrl: './radar.component.html',
    styleUrl: './radar.component.scss'
})
export class RadarComponent {
}
