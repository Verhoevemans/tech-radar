import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
import { RadarMapComponent } from './radar-map/radar-map.component';

@Component({
  selector: 'radar-details',
  standalone: true,
  imports: [
    BlipListComponent,
    ButtonComponent,
    HeaderComponent,
    RadarMapComponent,
    BlipDetailsComponent,
    NotificationComponent,
    SpinnerComponent,
    InputComponent,
    FormsModule
  ],
  templateUrl: './radar-details.component.html',
  styleUrl: './radar-details.component.scss'
})
export class RadarDetailsComponent implements OnInit, OnDestroy {
  @Input()
  public name!: string;

  public error: string | undefined;
  public loading = false;
  public radar: Radar | undefined;

  public messages: string[] = [];
  public message = new FormControl();

  public get headerTitle(): string {
    return this.name.toUpperCase();
  }

  public constructor(private readonly detailsService: RadarDetailsService,
                     private readonly modalService: ModalService,
                     private readonly route: ActivatedRoute,
                     private readonly blipVotesService: BlipVotesService) {}

  public ngOnInit(): void {
    // TODO: this setRadarName can be done with the @Input prop name?
    this.detailsService.setRadarName(this.route.snapshot.paramMap.get('name')!);
    this.getRadarDetails();
    this.setupVotingSessionConnection();
  }

  public ngOnDestroy(): void {
    this.blipVotesService.stopVotingSession();
  }

  public getBlipsByQuadrant(quadrant: string): Blip[] {
    return this.radar
      ? this.radar.blips.filter(blip => blip.quadrant === quadrant)
      : [];
  }

  public openBlipDetailsModal(blip: Blip, edit = false): void {
    this.modalService.openModal(BlipDetailsComponent as Component, 'Blip Details', {
      data: { blip, edit },
      onClose: this.getRadarDetails.bind(this)
    });
  }

  private getRadarDetails(): void {
    this.loading = true;
    this.detailsService.getRadarDetails(this.name).subscribe({
      next: (response) => {
        console.log('GET - Radar Details', response);
        this.radar = response;
      },
      error: (_error) => {
        this.loading = false;
        this.error = 'Something went wrong when retrieving the Radar Details. Please try again later';
      },
      complete: () => {
        this.loading = false;
        this.error = undefined;
      }
    });
  }

  private setupVotingSessionConnection(): void {
    this.blipVotesService.createVotingConnection(this.name).subscribe({
      next: (event: VotingEvent): void => {
        console.log('we have something!!', event);
        if (event.type === 'start') {
          console.log('socket event says start, opening vote modal!');
          this.modalService.openModal(BlipVotesComponent as Component, 'Vote!', {
            data: event.blipId
          });
        } else if (event.type === 'message') {
          this.messages.push(`an event was send: ${event.message}`);
        } else if (event.type === 'vote') {
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
