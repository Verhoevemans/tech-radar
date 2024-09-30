import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Radar } from '../../../../shared/radar.model';

interface RadarResponse {
  success: boolean,
  data: Radar
}

@Injectable({
  providedIn: 'root'
})
export class CreateRadarModalService {
  constructor(private readonly httpClient: HttpClient) {}

  public createRadar(name: string, quadrants: string[]): Observable<Radar> {
    return this.httpClient
      .post<RadarResponse>('api/radars', { name, quadrants })
      .pipe(
        map(response => response.data)
      );
  }
}
