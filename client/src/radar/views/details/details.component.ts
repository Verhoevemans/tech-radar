import { Component, Input, OnInit } from '@angular/core';

import { ButtonComponent } from '../../shared/components/common/button/button.component';
import { HeaderComponent } from '../../shared/components/core/header/header.component';
import { Radar } from '../../shared/models/radar.model';

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
    RadarMapComponent
  ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
  @Input()
  public name!: string;

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
        this.loading = false;
        this.radar = response;
      }
    });
  }
}
