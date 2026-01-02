import { Component, computed, EventEmitter, inject, Output, Signal } from '@angular/core';
import { FormControl } from '@angular/forms';

import { BarComponent } from '../../../../shared/components/common/bar/bar.component';
import { ButtonComponent } from '../../../../shared/components/common/button/button.component';
import { TextareaComponent } from '../../../../shared/components/common/textarea/textarea.component';
import { Blip, Ring, rings } from '../../../../shared/models/blip.model';
import { Radar } from '../../../../shared/models/radar.model';
import { Vote, VotingResult } from '../../../../shared/models/vote.model';
import { RadarDetailsStore } from '../../radar-details.store';
import { BlipVotesService } from '../blip-votes.service';

@Component({
    selector: 'radar-blip-votes-results',
    imports: [
        BarComponent,
        ButtonComponent,
        TextareaComponent
    ],
    templateUrl: './blip-votes-results.component.html',
    styleUrl: './blip-votes-results.component.scss'
})
export class BlipVotesResultsComponent {
  private readonly blipVotesService: BlipVotesService = inject(BlipVotesService);
  private readonly store: RadarDetailsStore = inject(RadarDetailsStore);

  @Output()
  public onSelectResult = new EventEmitter<VotingResult>();

  public comment = new FormControl('');

  public radar: Signal<Radar | undefined> = this.store.state.select(state => state.radar());
  public votes: Signal<Vote[]> = this.store.state.select(state => state.votes());
  public votingSessionBlipId: Signal<string | undefined> = this.store.state.select(state => state.votingSessionBlipId());
  public votingSessionBlipName: Signal<Blip | undefined> = computed(() => this.radar()?.blips.find(blip => blip.id === this.votingSessionBlipId()));

  protected readonly rings = rings;

  public cancelVote(): void {
    this.blipVotesService.stopVotingSession();
  }

  public getVotesForRing(ring: Ring): number {
    return this.votes().filter(vote => vote === ring).length;
  }

  public selectResult(result: Ring): void {
    const votingResult: VotingResult = {
      votes: this.votes(),
      comment: this.comment.value || undefined,
      result
    };

    this.onSelectResult.emit(votingResult);
  }
}
