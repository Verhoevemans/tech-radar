import { Component, OnInit } from '@angular/core';

import { Ring, rings } from '../../../../shared/models/blip.model';
import { VotingResults } from '../../../../shared/models/vote.model';
import { BlipVotesService } from '../blip-votes.service';

@Component({
  selector: 'radar-blip-votes-scores',
  standalone: true,
  imports: [],
  templateUrl: './blip-votes-scores.component.html',
  styleUrl: './blip-votes-scores.component.scss'
})
export class BlipVotesScoresComponent implements OnInit {
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
