import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { BarComponent } from '../../../../shared/components/common/bar/bar.component';
import { ButtonComponent } from '../../../../shared/components/common/button/button.component';
import { Ring, rings } from '../../../../shared/models/blip.model';
import { Vote, VotingResults } from '../../../../shared/models/vote.model';
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
export class BlipVotesResultsComponent implements OnInit {
  @Output()
  public onSelectResult = new EventEmitter<{ result: Ring, votes: Vote[] }>();

  protected readonly rings = rings;
  public votes: Vote[] = [];

  public constructor(private readonly blipVotesService: BlipVotesService) {}

  public ngOnInit(): void {
    this.blipVotesService.getVotingResults().subscribe({
      next: (results: VotingResults) => {
        this.votes = results.votes;
      }
    });
  }

  public getVotesForRing(ring: Ring): number {
    return this.votes.filter(vote => vote === ring).length;
  }

  public selectResult(result: Ring): void {
    this.onSelectResult.emit({ result, votes: this.votes });
  }
}
