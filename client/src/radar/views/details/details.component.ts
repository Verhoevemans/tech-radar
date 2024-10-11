import { Component, Input, OnInit } from '@angular/core';

import { ButtonComponent } from '../../shared/components/common/button/button.component';
import { NotificationComponent } from '../../shared/components/common/notification/notification.component';
import { SpinnerComponent } from '../../shared/components/common/spinner/spinner.component';
import { HeaderComponent } from '../../shared/components/core/header/header.component';
import { Blip } from '../../shared/models/blip.model';
import { Radar } from '../../shared/models/radar.model';

import { BlipDetailsComponent } from './blip-details/blip-details.component';
import { BlipListComponent } from './blip-list/blip-list.component';
import { DetailsService } from './details.service';
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
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  @Input()
  public name!: string;

  public error: string | undefined;
  public loading = false;
  public radar: Radar | undefined;

  public get headerTitle(): string {
    return `${ this.name.toUpperCase() } Radar`;
  }

  public constructor(private readonly detailsService: DetailsService) {}

  public ngOnInit(): void {
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

  public getBlipsByQuadrant(quadrant: string): Blip[] {
    return this.radar
      ? this.radar.blips.filter(blip => blip.quadrant === quadrant)
      : [];
  }
}
