import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ButtonComponent } from '../../shared/components/common/button/button.component';
import { NotificationComponent } from '../../shared/components/common/notification/notification.component';
import { SpinnerComponent } from '../../shared/components/common/spinner/spinner.component';
import { HeaderComponent } from '../../shared/components/core/header/header.component';
import { ModalService } from '../../shared/components/core/modal/modal.service';
import { Blip } from '../../shared/models/blip.model';
import { Radar } from '../../shared/models/radar.model';

import { BlipDetailsComponent } from './blip-details/blip-details.component';
import { BlipListComponent } from './blip-list/blip-list.component';
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
    SpinnerComponent
  ],
  templateUrl: './radar-details.component.html',
  styleUrl: './radar-details.component.scss'
})
export class RadarDetailsComponent implements OnInit {
  @Input()
  public name!: string;

  public error: string | undefined;
  public loading = false;
  public radar: Radar | undefined;

  public get headerTitle(): string {
    return this.name.toUpperCase();
  }

  public constructor(private readonly detailsService: RadarDetailsService,
                     private readonly modalService: ModalService,
                     private readonly route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.detailsService.setRadarName(this.route.snapshot.paramMap.get('name')!);
    this.getRadarDetails();
  }

  public getBlipsByQuadrant(quadrant: string): Blip[] {
    return this.radar
      ? this.radar.blips.filter(blip => blip.quadrant === quadrant)
      : [];
  }

  public openBlipDetailsModal(blip: Blip): void {
    this.modalService.openModal(BlipDetailsComponent as Component, 'Blip Details', {
      data: blip,
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
}
