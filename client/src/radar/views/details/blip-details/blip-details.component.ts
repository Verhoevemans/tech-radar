import { Component, Inject } from '@angular/core';

import { MODAL_DATA, ModalData } from '../../../shared/components/common/modal/modal.model';
import { Blip } from '../../../shared/models/blip.model';

import { BlipDetailsFormComponent } from './blip-details-form/blip-details-form.component';

@Component({
  selector: 'radar-blip-details',
  standalone: true,
  imports: [
    BlipDetailsFormComponent
  ],
  templateUrl: './blip-details.component.html',
  styleUrl: './blip-details.component.scss'
})
export class BlipDetailsComponent {
  public blip: Blip;

  public constructor(@Inject(MODAL_DATA) public modalData: ModalData) {
    this.blip = modalData.data;
  }
}
