import { Component, Input, OnDestroy, OnInit, Signal } from '@angular/core';

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
import { RadarDetailsStore, Status } from './radar-details.store';
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

  public status: Signal<Status> = this.store.state.select(state => state.status());
  public radar: Signal<Radar | undefined> = this.store.state.select(state => state.radar());

  public get headerTitle(): string {
    return this.name.toUpperCase();
  }

  public constructor(private readonly blipVotesService: BlipVotesService,
                     private readonly detailsService: RadarDetailsService,
                     private readonly modalService: ModalService,
                     private readonly store: RadarDetailsStore) {}

  public ngOnInit(): void {
    this.getRadarDetails();
    this.setupVotingSessionConnection();
  }

  public ngOnDestroy(): void {
    this.blipVotesService.stopVotingSession();
  }

  public getBlipsByQuadrant(quadrant: string): Blip[] {
    return this.radar()?.blips.filter(blip => blip.quadrant === quadrant) || [];
  }

  public openBlipDetailsModal(blip: Blip, edit = false): void {
    this.modalService.openModal(BlipDetailsComponent as Component, 'Blip Details', {
      data: { blip, edit },
      onClose: this.getRadarDetails.bind(this)
    });
  }

  private getRadarDetails(): void {
    this.store.state.update('status', 'loading');
    this.detailsService.getRadarDetails(this.name).subscribe({
      next: (response) => {
        this.store.state.update('radar', response);
      },
      error: (_error) => {
        this.store.state.update('status', 'error');
      },
      complete: () => {
        this.store.state.update('status', 'success');
      }
    });
  }

  private setupVotingSessionConnection(): void {
    this.blipVotesService.createVotingConnection(this.name).subscribe({
      next: (event: VotingEvent): void => {
        if (event.type === 'start') {
          const blip = this.radar()?.blips.find(blip => blip.id === event.blipId);
          this.modalService.openModal(BlipVotesComponent as Component, `Vote position for: ${blip?.name}`, {
            data: event.blipId
          });
        } else if (event.type === 'vote') {
          // TODO: listen to event type STOP
          console.log('A Vote was cast!', event.vote);
        }
      },
      error: (error: string) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete!');
      }
    });
  }
}
