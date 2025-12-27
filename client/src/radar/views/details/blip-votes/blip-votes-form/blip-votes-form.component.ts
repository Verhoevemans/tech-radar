import { Component, computed, inject, Signal } from '@angular/core';

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
  private readonly blipVotesService: BlipVotesService = inject(BlipVotesService);
  private readonly store: RadarDetailsStore = inject(RadarDetailsStore);

  protected readonly rings = rings;

  public radar: Signal<Radar | undefined> = this.store.state.select(state => state.radar());
  public votingSessionBlipId: Signal<string | undefined> = this.store.state.select(state => state.votingSessionBlipId());
  public votingSessionBlipName: Signal<Blip | undefined> = computed(() => this.radar()?.blips.find(blip => blip.id === this.votingSessionBlipId()));
  public votingSessionSelectedRing: Signal<Ring | undefined> = this.store.state.select(state => state.votingSessionSelectedRing());

  public onVote(ring: Ring): void {
    if (ring === this.votingSessionSelectedRing()) {
      this.store.state.update('votingSessionSelectedRing', undefined);
    } else {
      this.store.state.update('votingSessionSelectedRing', ring);
    }
    this.blipVotesService.sendVote(this.votingSessionSelectedRing());
  }
}
