import { Component, OnInit } from '@angular/core';

import { Ring, rings } from '../../../../shared/models/blip.model';
import { VotingResults } from '../../../../shared/models/vote.model';
import { BarComponent } from '../../../../shared/components/common/bar/bar.component';
import { BlipVotesService } from '../blip-votes.service';

@Component({
  selector: 'radar-blip-votes-results',
  standalone: true,
  imports: [
    BarComponent
  ],
  templateUrl: './blip-votes-results.component.html',
  styleUrl: './blip-votes-results.component.scss'
})
export class BlipVotesResultsComponent implements OnInit {
  protected readonly rings = rings;
  public votes: (Ring | undefined)[] = [];

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
}
