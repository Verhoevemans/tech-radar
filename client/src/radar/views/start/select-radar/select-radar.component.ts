import { Component, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { NotificationComponent } from '../../../shared/components/common/notification/notification.component';
import { SpinnerComponent } from '../../../shared/components/common/spinner/spinner.component';
import { TileComponent } from '../../../shared/components/common/tile/tile.component';
import { Radar } from '../../../shared/models/radar.model';
import { StartStore, Status } from '../start.store';

import { SelectRadarService } from './select-radar.service';

@Component({
  selector: 'radar-select-radar',
  standalone: true,
  imports: [
    ButtonComponent,
    NotificationComponent,
    SpinnerComponent,
    TileComponent
  ],
  templateUrl: './select-radar.component.html',
  styleUrl: './select-radar.component.scss'
})
export class SelectRadarComponent implements OnInit {
  public status: Signal<Status> = this.store.status;
  public radars: Signal<Radar[]> = this.store.radars;

  public constructor(private readonly selectRadarService: SelectRadarService,
                     private readonly store: StartStore,
                     private readonly router: Router) {}

  public ngOnInit() {
    this.store.setStatus('loading');
    this.selectRadarService.getRadars().subscribe({
      next: (response) => {
        console.log('GET - Radars', response);
        this.store.setRadars(response);
        /*
        * TODO: the real update function should look like and be implemented like this:
        *  this.store.update('radars', response);
        *  this.store.update('status', 'success');
        * */
      },
      error: (_error) => {
        this.store.setStatus('error');
      },
      complete: () => {
        this.store.setStatus('success');
      }
    });
  }

  public openRadar(radarUrl: string): void {
    this.router.navigate(['radar', radarUrl]);
  }
}
