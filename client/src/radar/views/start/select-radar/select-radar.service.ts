import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Radar, RadarsAPIResponse } from '../../../shared/models/radar.model';

@Injectable({
  providedIn: 'root'
})
export class SelectRadarService {
  constructor(private readonly httpClient: HttpClient) {}

  public getRadars(): Observable<Radar[]> {
    return this.httpClient
      .get<RadarsAPIResponse>(`${environment.apiUrl}/api/radars`)
      .pipe(
        map(response => response.data)
      );
  }
}
