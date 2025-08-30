import { Component, computed, Signal } from '@angular/core';

import { ButtonComponent } from '../../../../shared/components/common/button/button.component';
import { Blip, Ring, rings } from '../../../../shared/models/blip.model';
import { Radar } from '../../../../shared/models/radar.model';
import { RadarDetailsStore } from '../../radar-details.store';
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
  public radar: Signal<Radar | undefined> = this.store.state.select(state => state.radar());
  public votingSessionBlipId: Signal<string | undefined> = this.store.state.select(state => state.votingSessionBlipId());
  public votingSessionBlipName: Signal<Blip | undefined> = computed(() => this.radar()?.blips.find(blip => blip.id === this.votingSessionBlipId()));

  protected readonly rings = rings;
  public selectedRing: Ring | undefined;

  public constructor(private readonly blipVotesService: BlipVotesService,
                     private readonly store: RadarDetailsStore) {}

  public onVote(ring: Ring): void {
    if (ring === this.selectedRing) {
      this.selectedRing = undefined;
    } else {
      this.selectedRing = ring;
    }
    this.blipVotesService.sendVote(this.selectedRing);
  }
}
