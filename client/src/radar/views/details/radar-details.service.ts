import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Radar, RadarAPIResponse } from '../../shared/models/radar.model';

@Injectable({
  providedIn: 'root'
})
export class RadarDetailsService {
  constructor(private readonly httpClient: HttpClient) {}

  public getRadarDetails(radarName: string): Observable<Radar> {
    return this.httpClient
      .get<RadarAPIResponse>(`${environment.apiUrl}/api/radars/${radarName}`)
      .pipe(
        map(response => response.data)
      );
  }
}
