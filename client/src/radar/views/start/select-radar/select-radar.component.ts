import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { Radar } from '../../../shared/models/radar.model';

import { SelectRadarService } from './select-radar.service';
import { NotificationComponent } from '../../../shared/components/common/notification/notification.component';

@Component({
  selector: 'radar-select',
  standalone: true,
  imports: [
    ButtonComponent,
    NotificationComponent
  ],
  templateUrl: './select-radar.component.html',
  styleUrl: './select-radar.component.scss'
})
export class SelectRadarComponent implements OnInit {
  public radars: Radar[] = [];
  public error: string | undefined;

  public constructor(private readonly selectRadarService: SelectRadarService,
                     private readonly router: Router) {}

  public ngOnInit() {
    this.selectRadarService.getRadars().subscribe({
      next: (response) => {
        console.log('data was fetched', response);
        this.radars = response.data;
      },
      error: (_error) => {
        this.error = 'Something went wrong when retrieving the Radars. Please try again later';
      },
      complete: () => {
        this.error = undefined;
      }
    });
  }

  public openRadar(radarUrl: string): void {
    this.router.navigate(['radar', radarUrl]);
  }
}
