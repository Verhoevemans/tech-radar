import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { Radar } from '../../../shared/radar.model';

import { SelectRadarService } from './select-radar.service';

@Component({
  selector: 'radar-select',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './select-radar.component.html',
  styleUrl: './select-radar.component.scss'
})
export class SelectRadarComponent implements OnInit {
  public radars: Radar[] = [];

  public constructor(private readonly selectRadarService: SelectRadarService,
                     private readonly router: Router) {}

  public ngOnInit() {
    this.selectRadarService.getRadars().subscribe({
      next: (response) => {
        console.log('data was fetched', response);
        this.radars = response.data;
      },
      error: (error) => console.error(error)
    });
  }

  public openRadar(radarUrl: string): void {
    this.router.navigate(['radar', radarUrl]);
  }
}
