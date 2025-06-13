import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, tap } from 'rxjs';

import { Blip } from '../../shared/models/blip.model';
import { Radar, RadarAPIResponse } from '../../shared/models/radar.model';

@Injectable({
  providedIn: 'root'
})
export class RadarDetailsService {
  private radarName: string | undefined;
  private radar: Radar | undefined;

  public highlightedBlipId = new Subject<string | undefined>();

  constructor(private readonly httpClient: HttpClient) {}

  public getRadarDetails(radarName: string): Observable<Radar> {
    return this.httpClient
      .get<RadarAPIResponse>(`api/radars/${radarName}`)
      .pipe(
        map(response => response.data),
        tap(radar => this.radar = radar)
      );
  }

  public highLightBlip(id: string | undefined): void {
    this.highlightedBlipId.next(id);
  }

  public getBlipById(blipId: string): Blip | undefined {
    return this.radar?.blips.find(blip => blip.id === blipId);
  }

  public getRadarName(): string | undefined {
    return this.radarName;
  }

  public setRadarName(name: string): void {
    this.radarName = name;
  }
}
