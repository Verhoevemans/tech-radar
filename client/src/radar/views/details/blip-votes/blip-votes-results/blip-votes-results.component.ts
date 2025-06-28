import { Component, EventEmitter, Output, Signal } from '@angular/core';

import { BarComponent } from '../../../../shared/components/common/bar/bar.component';
import { ButtonComponent } from '../../../../shared/components/common/button/button.component';
import { Ring, rings } from '../../../../shared/models/blip.model';
import { Vote } from '../../../../shared/models/vote.model';
import { RadarDetailsStore } from '../../radar-details.store';

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

  protected readonly rings = rings;
  public votes: Signal<Vote[]> = this.store.state.select(state => state.votes());

  public constructor(private readonly store: RadarDetailsStore) {}

  public getVotesForRing(ring: Ring): number {
    return this.votes().filter(vote => vote === ring).length;
  }

  public selectResult(result: Ring): void {
    this.onSelectResult.emit({ result, votes: this.votes() });
  }
}
