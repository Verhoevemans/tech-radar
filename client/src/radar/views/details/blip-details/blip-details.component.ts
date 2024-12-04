import { Component, Inject } from '@angular/core';

import { MODAL_DATA, ModalData } from '../../../shared/components/common/modal/modal.model';
import { ModalService } from '../../../shared/components/common/modal/modal.service';
import { NotificationComponent } from '../../../shared/components/common/notification/notification.component';
import { SpinnerComponent } from '../../../shared/components/common/spinner/spinner.component';
import { Blip } from '../../../shared/models/blip.model';

import { BlipDetailsFormComponent } from './blip-details-form/blip-details-form.component';
import { BlipDetailsService } from './blip-details.service';

@Component({
  selector: 'radar-blip-details',
  standalone: true,
  imports: [
    BlipDetailsFormComponent,
    NotificationComponent,
    SpinnerComponent
  ],
  templateUrl: './blip-details.component.html',
  styleUrl: './blip-details.component.scss'
})
export class BlipDetailsComponent {
  public blip: Blip;
  public edit: boolean;
  public error: string | undefined;
  public loading = false;

  private modalCloseCallback: () => void;

  public constructor(private readonly blipDetailsService: BlipDetailsService,
                     @Inject(MODAL_DATA) public modalData: ModalData,
                     private readonly modalService: ModalService) {
    this.blip = modalData.data;
    this.edit = !!this.blip.id;
    this.modalCloseCallback = modalData.onClose!;
  }

  public saveBlip(blip: Blip): void {
    this.loading = true;
    const apiRequest = this.edit
      ? this.blipDetailsService.updateBlip.bind(this.blipDetailsService)
      : this.blipDetailsService.createBlip.bind(this.blipDetailsService);

    apiRequest(blip).subscribe({
      next: (blip) => {
        console.log('blip was saved', blip);
        this.modalCloseCallback();
        this.modalService.closeModal();
      },
      error: (_error) => {
        this.loading = false;
        this.error = 'Something went wrong when trying to save the Blip. Please try again later.';
      },
      complete: () => {
        this.loading = false;
        this.error = undefined;
      }
    });
  }
}
