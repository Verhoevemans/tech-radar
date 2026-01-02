import { Component, inject, Inject } from '@angular/core';

import { NotificationComponent } from '../../../shared/components/common/notification/notification.component';
import { SpinnerComponent } from '../../../shared/components/common/spinner/spinner.component';
import { MODAL_DATA, ModalData } from '../../../shared/components/core/modal/modal.model';
import { ModalService } from '../../../shared/components/core/modal/modal.service';
import { Blip } from '../../../shared/models/blip.model';
import { BlipVotesService } from '../blip-votes/blip-votes.service';

import { BlipDetailsFormComponent } from './blip-details-form/blip-details-form.component';
import { BlipDetailsService } from './blip-details.service';

@Component({
    selector: 'radar-blip-details',
    imports: [
        BlipDetailsFormComponent,
        NotificationComponent,
        SpinnerComponent
    ],
    templateUrl: './blip-details.component.html',
    styleUrl: './blip-details.component.scss'
})
export class BlipDetailsComponent {
  private readonly blipDetailsService: BlipDetailsService = inject(BlipDetailsService);
  private readonly blipVotesService: BlipVotesService = inject(BlipVotesService);
  private readonly modalService: ModalService = inject(ModalService);
  public modalData: ModalData = inject(MODAL_DATA);

  public blip: Blip = this.modalData.data.blip;
  public edit: boolean = this.modalData.data.edit;
  public error: string | undefined;
  public loading = false;
  public radarUrl: string = this.modalData.data.radarUrl;

  private modalCloseCallback: () => void = this.modalData.onClose!;

  public saveBlip(blip: Blip): void {
    this.loading = true;
    const apiRequest = this.blip.id
      ? this.blipDetailsService.updateBlip.bind(this.blipDetailsService)
      : this.blipDetailsService.createBlip.bind(this.blipDetailsService);

    apiRequest(blip, this.radarUrl).subscribe({
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

  public startVote(blip: Blip): void {
    this.blipVotesService.startVotingSession(blip.id);
  };
}
