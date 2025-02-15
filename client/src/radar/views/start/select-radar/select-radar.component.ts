import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { Radar } from '../../../shared/models/radar.model';

import { SelectRadarService } from './select-radar.service';
import { NotificationComponent } from '../../../shared/components/common/notification/notification.component';
import { SpinnerComponent } from '../../../shared/components/common/spinner/spinner.component';

@Component({
  selector: 'radar-select-radar',
  standalone: true,
  imports: [
    ButtonComponent,
    NotificationComponent,
    SpinnerComponent
  ],
  templateUrl: './select-radar.component.html',
  styleUrl: './select-radar.component.scss'
})
export class SelectRadarComponent implements OnInit {
  public error: string | undefined;
  public loading = false;
  public radars: Radar[] = [];

  public constructor(private readonly selectRadarService: SelectRadarService,
                     private readonly router: Router) {}

  public ngOnInit() {
    this.loading = true;
    this.selectRadarService.getRadars().subscribe({
      next: (response) => {
        console.log('GET - Radars', response);
        this.radars = response;
      },
      error: (_error) => {
        this.loading = false;
        this.error = 'Something went wrong when retrieving the Radars. Please try again later';
      },
      complete: () => {
        this.loading = false;
        this.error = undefined;
      }
    });
  }

  public openRadar(radarUrl: string): void {
    this.router.navigate(['radar', radarUrl]);
  }
}
