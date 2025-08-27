import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { Radar, RadarAPIResponse } from '../../../../shared/models/radar.model';

@Injectable({
  providedIn: 'root'
})
export class CreateRadarFormService {
  constructor(private readonly httpClient: HttpClient) {}

  public createRadar(name: string, quadrants: string[]): Observable<Radar> {
    return this.httpClient
      .post<RadarAPIResponse>(`${environment.apiUrl}/api/radars`, { name, quadrants })
      .pipe(
        map(response => response.data)
      );
  }
}
