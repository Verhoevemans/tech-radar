import { Component, Input, OnDestroy, OnInit, Signal } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ButtonComponent } from '../../shared/components/common/button/button.component';
import { InputComponent } from '../../shared/components/common/input/input.component';
import { NotificationComponent } from '../../shared/components/common/notification/notification.component';
import { SpinnerComponent } from '../../shared/components/common/spinner/spinner.component';
import { HeaderComponent } from '../../shared/components/core/header/header.component';
import { ModalService } from '../../shared/components/core/modal/modal.service';
import { Blip } from '../../shared/models/blip.model';
import { Radar } from '../../shared/models/radar.model';
import { VotingEvent } from '../../shared/models/vote.model';

import { BlipDetailsComponent } from './blip-details/blip-details.component';
import { BlipListComponent } from './blip-list/blip-list.component';
import { BlipVotesComponent } from './blip-votes/blip-votes.component';
import { BlipVotesService } from './blip-votes/blip-votes.service';
import { RadarDetailsService } from './radar-details.service';
import { RadarDetailsStore, LoadingStatus } from './radar-details.store';
import { RadarMapComponent } from './radar-map/radar-map.component';

@Component({
  selector: 'radar-details',
  standalone: true,
  imports: [
    BlipDetailsComponent,
    BlipListComponent,
    ButtonComponent,
    HeaderComponent,
    InputComponent,
    NotificationComponent,
    RadarMapComponent,
    SpinnerComponent
  ],
  templateUrl: './radar-details.component.html',
  styleUrl: './radar-details.component.scss'
})
export class RadarDetailsComponent implements OnInit, OnDestroy {
  @Input()
  public name!: string;

  public loadingStatus: Signal<LoadingStatus> = this.store.state.select(state => state.loadingStatus());
  public votingSessionBlipId: Signal<string | undefined> = this.store.state.select(state => state.votingSessionBlipId());
  public radar: Signal<Radar | undefined> = this.store.state.select(state => state.radar());
  public radarUrl: Signal<string> = this.store.state.select(state => state.radarUrl());

  public onDestroy$ = new Subject<void>();

  public get headerTitle(): string {
    return this.name.toUpperCase();
  }

  public constructor(private readonly blipVotesService: BlipVotesService,
                     private readonly detailsService: RadarDetailsService,
                     private readonly modalService: ModalService,
                     private readonly store: RadarDetailsStore) {}

  public ngOnInit(): void {
    this.store.state.update('radarUrl', this.name.toLowerCase());
    this.getRadarDetails();
    this.setupVotingSessionConnection();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public openBlipDetailsModal(blip: Blip, edit = false): void {
    this.modalService.openModal(BlipDetailsComponent as Component, 'Blip Details', {
      data: { blip, edit, radarUrl: this.radarUrl() },
      onClose: this.getRadarDetails.bind(this)
    });
  }

  public openBlipVotesModal(): void {
    this.modalService.openModal(BlipVotesComponent as Component, 'Voting for Blip position', {
      data: { blipId: this.votingSessionBlipId(), radarUrl: this.radarUrl() }
    });
  }

  private getRadarDetails(): void {
    this.store.state.update('loadingStatus', 'loading');
    this.detailsService.getRadarDetails(this.name).subscribe({
      next: (response) => {
        this.store.state.update('radar', response);
      },
      error: (_error) => {
        this.store.state.update('loadingStatus', 'error');
      },
      complete: () => {
        this.store.state.update('loadingStatus', 'success');
      }
    });
  }

  private setupVotingSessionConnection(): void {
    this.blipVotesService.createVotingConnection(this.name)
      .pipe(
        takeUntil(this.onDestroy$)
      ).subscribe({
        next: (event: VotingEvent): void => {
          if (event.type === 'start') {
            this.store.state.update('votingSessionBlipId', event.blipId);
            this.openBlipVotesModal();
          } else if (event.type === 'stop') {
            this.store.state.update('votingSessionBlipId', undefined);
            this.modalService.closeModal();
            this.getRadarDetails();
          }
        },
        error: (error: string) => {
          console.log(error);
        },
        complete: () => {
          console.log('complete!');
        }
      }
    );
  }
}
