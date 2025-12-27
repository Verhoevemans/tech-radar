import { Component, inject, Inject, OnDestroy, Signal } from '@angular/core';

import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { TabComponent } from '../../../shared/components/common/tab/tab.component';
import { MODAL_DATA, ModalData } from '../../../shared/components/core/modal/modal.model';
import { VotingResult } from '../../../shared/models/vote.model';
import { RadarDetailsStore } from '../radar-details.store';

import { BlipVotesService } from './blip-votes.service';
import { BlipVotesFormComponent } from './blip-votes-form/blip-votes-form.component';
import { BlipVotesResultsComponent } from './blip-votes-results/blip-votes-results.component';

type Tab = 'VOTE' | 'RESULTS';

@Component({
  selector: 'radar-blip-votes',
  standalone: true,
  imports: [
    BlipVotesFormComponent,
    BlipVotesResultsComponent,
    ButtonComponent,
    TabComponent
  ],
  templateUrl: './blip-votes.component.html',
  styleUrl: './blip-votes.component.scss'
})
export class BlipVotesComponent implements OnDestroy {
  private readonly blipVotesService: BlipVotesService = inject(BlipVotesService);
  private readonly store: RadarDetailsStore = inject(RadarDetailsStore);
  public modalData: ModalData = inject(MODAL_DATA);

  public votingSessionStartedByUser: Signal<boolean> = this.store.state.select(state => state.votingSessionStartedByUser());

  public activeTab: Tab = this.votingSessionStartedByUser() ? 'RESULTS' : 'VOTE';
  public blipId: string = this.modalData.data.blipId;
  public tabs = ['VOTE', 'RESULTS'];
  public radarUrl: string = this.modalData.data.radarUrl;

  public ngOnDestroy(): void {
    this.store.state.update('votingSessionSelectedRing', undefined);
    this.store.state.update('votingSessionStartedByUser', false);
  }

  public saveVoteResults(votingResult: VotingResult): void {
    this.blipVotesService.saveVotesForBlip(votingResult, this.radarUrl, this.blipId).subscribe({
      next: (_blip) => {
        this.blipVotesService.stopVotingSession();
      }
    });
  }

  public setActiveTab(tab: Tab) {
    this.activeTab = tab;
  }
}
