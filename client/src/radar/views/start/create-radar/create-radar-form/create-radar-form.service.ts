import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../../../environments/environment';
import { Radar, RadarAPIResponse } from '../../../../shared/models/radar.model';

@Injectable({
  providedIn: 'root'
})
export class CreateRadarFormService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  public createRadar(name: string, quadrants: string[], description?: string): Observable<Radar> {
    return this.httpClient
      .post<RadarAPIResponse>(`${environment.apiUrl}/api/radars`, { name, quadrants, description })
      .pipe(
        map(response => response.data)
      );
  }
}
