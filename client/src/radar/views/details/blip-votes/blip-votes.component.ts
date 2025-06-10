import { Component, Inject, OnDestroy } from '@angular/core';

import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { TabComponent } from '../../../shared/components/common/tab/tab.component';
import { MODAL_DATA, ModalData } from '../../../shared/components/core/modal/modal.model';

import { BlipVotesService } from './blip-votes.service';
import { BlipVotesFormComponent } from './blip-votes-form/blip-votes-form.component';
import { BlipVotesResultsComponent } from './blip-votes-results/blip-votes-results.component';

type Tab = 'vote' | 'result';

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
  public activeTab: Tab = 'vote';
  public blipId: string;
  public tabs = ['vote', 'result'];

  public constructor(@Inject(MODAL_DATA) public modalData: ModalData,
                     private readonly blipVotesService: BlipVotesService) {
    this.blipId = modalData.data;
  }

  public ngOnDestroy(): void {
    this.blipVotesService.stopVotingSession();
  }

  public setActiveTab(tab: Tab) {
    this.activeTab = tab;
  }
}
