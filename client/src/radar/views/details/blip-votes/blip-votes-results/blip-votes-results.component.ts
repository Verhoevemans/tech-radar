import { Component, computed, EventEmitter, Output, Signal } from '@angular/core';

import { BarComponent } from '../../../../shared/components/common/bar/bar.component';
import { ButtonComponent } from '../../../../shared/components/common/button/button.component';
import { Blip, Ring, rings } from '../../../../shared/models/blip.model';
import { Radar } from '../../../../shared/models/radar.model';
import { Vote } from '../../../../shared/models/vote.model';
import { RadarDetailsStore } from '../../radar-details.store';
import { BlipVotesService } from '../blip-votes.service';

@Component({
  selector: 'radar-blip-votes-results',
  standalone: true,
  imports: [
    BarComponent,
    ButtonComponent
  ],
  templateUrl: './blip-votes-results.component.html',
  styleUrl: './blip-votes-results.component.scss'
})
export class BlipVotesResultsComponent {
  @Output()
  public onSelectResult = new EventEmitter<{ result: Ring, votes: Vote[] }>();

  public radar: Signal<Radar | undefined> = this.store.state.select(state => state.radar());
  public votes: Signal<Vote[]> = this.store.state.select(state => state.votes());
  public votingSessionBlipId: Signal<string | undefined> = this.store.state.select(state => state.votingSessionBlipId());
  public votingSessionBlipName: Signal<Blip | undefined> = computed(() => this.radar()?.blips.find(blip => blip.id === this.votingSessionBlipId()));

  protected readonly rings = rings;

  public constructor(private readonly blipVotesService: BlipVotesService,
                     private readonly store: RadarDetailsStore) {}

  public cancelVote(): void {
    this.blipVotesService.stopVotingSession();
  }

  public getVotesForRing(ring: Ring): number {
    return this.votes().filter(vote => vote === ring).length;
  }

  public selectResult(result: Ring): void {
    this.onSelectResult.emit({ result, votes: this.votes() });
  }
}
