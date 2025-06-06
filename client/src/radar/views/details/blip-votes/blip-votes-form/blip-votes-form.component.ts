import { Component } from '@angular/core';

import { ButtonComponent } from '../../../../shared/components/common/button/button.component';
import { Ring, rings } from '../../../../shared/models/blip.model';
import { BlipVotesService } from '../blip-votes.service';

@Component({
  selector: 'radar-blip-votes-form',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './blip-votes-form.component.html',
  styleUrl: './blip-votes-form.component.scss'
})
export class BlipVotesFormComponent {
  protected readonly rings = rings;
  public selectedRing: Ring | undefined;

  public constructor(private readonly blipVotesService: BlipVotesService) {}

  public onVote(ring: Ring): void {
    if (ring === this.selectedRing) {
      this.selectedRing = undefined;
    } else {
      this.selectedRing = ring;
    }
    this.blipVotesService.sendVote(this.selectedRing);
  }
}
