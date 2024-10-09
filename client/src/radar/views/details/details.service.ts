import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Radar } from '../../shared/models/radar.model';

interface RadarDetailsResponse {
  success: boolean,
  data: Radar
}

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  constructor(private readonly httpClient: HttpClient) {}

  public getRadarDetails(radarName: string): Observable<Radar> {
    return this.httpClient
      .get<RadarDetailsResponse>(`api/radars/${radarName}`)
      .pipe(
        map(response => response.data)
      );
  }
}
