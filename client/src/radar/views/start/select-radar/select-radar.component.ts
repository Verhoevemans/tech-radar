import { Component, inject, OnInit, Signal } from '@angular/core';
import { Router } from '@angular/router';

import { NotificationComponent } from '../../../shared/components/common/notification/notification.component';
import { SpinnerComponent } from '../../../shared/components/common/spinner/spinner.component';
import { TileComponent } from '../../../shared/components/common/tile/tile.component';
import { Radar } from '../../../shared/models/radar.model';
import { StartStore, Status } from '../start.store';

import { SelectRadarService } from './select-radar.service';

@Component({
    selector: 'radar-select-radar',
    imports: [
        NotificationComponent,
        SpinnerComponent,
        TileComponent
    ],
    templateUrl: './select-radar.component.html',
    styleUrl: './select-radar.component.scss'
})
export class SelectRadarComponent implements OnInit {
  private readonly selectRadarService: SelectRadarService = inject(SelectRadarService);
  private readonly store: StartStore = inject(StartStore);
  private readonly router: Router = inject(Router);

  public status: Signal<Status> = this.store.state.select(state => state.status());
  public radars: Signal<Radar[]> = this.store.state.select(state => state.radars());

  public ngOnInit(): void {
    this.store.state.update('status', 'loading');
    this.selectRadarService.getRadars().subscribe({
      next: (response) => {
        this.store.state.update('radars', response);
      },
      error: (_error) => {
        this.store.state.update('status', 'error');
      },
      complete: () => {
        this.store.state.update('status', 'success');
      }
    });
  }

  public openRadar(radarUrl: string): void {
    this.router.navigate(['radar', radarUrl]);
  }
}
