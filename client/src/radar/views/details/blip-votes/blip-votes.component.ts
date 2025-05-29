import { Component, Inject, OnDestroy } from '@angular/core';

import { MODAL_DATA, ModalData } from '../../../shared/components/core/modal/modal.model';
import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { Ring, rings } from '../../../shared/models/blip.model';

import { BlipVotesService } from './blip-votes.service';

@Component({
  selector: 'radar-blip-votes',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './blip-votes.component.html',
  styleUrl: './blip-votes.component.scss'
})
export class BlipVotesComponent implements OnDestroy {
  // TODO: is blipId still needed..?
  public blipId: string;
  public rings = rings;

  public constructor(@Inject(MODAL_DATA) public modalData: ModalData,
                     private readonly blipVotesService: BlipVotesService) {
    this.blipId = modalData.data;
  }

  public ngOnDestroy(): void {
    this.blipVotesService.stopVotingSession();
  }

  public onVote(ring: Ring): void {
    this.blipVotesService.sendVote(ring);
  }
}
