import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Radar, RadarAPIResponse } from '../../shared/models/radar.model';

@Injectable({
  providedIn: 'root'
})
export class RadarDetailsService {
  constructor(private readonly httpClient: HttpClient) {}

  public getRadarDetails(radarName: string): Observable<Radar> {
    return this.httpClient
      .get<RadarAPIResponse>(`api/radars/${radarName}`)
      .pipe(
        map(response => response.data)
      );
  }
}
