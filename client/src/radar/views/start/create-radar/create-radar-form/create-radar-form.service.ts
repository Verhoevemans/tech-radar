import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Radar, RadarAPIResponse } from '../../../../shared/models/radar.model';

@Injectable({
  providedIn: 'root'
})
export class CreateRadarFormService {
  constructor(private readonly httpClient: HttpClient) {}

  public createRadar(name: string, quadrants: string[]): Observable<Radar> {
    return this.httpClient
      .post<RadarAPIResponse>('api/radars', { name, quadrants })
      .pipe(
        map(response => response.data)
      );
  }
}
