import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Radar, RadarsAPIResponse } from '../../../shared/models/radar.model';

@Injectable({
  providedIn: 'root'
})
export class SelectRadarService {
  constructor(private readonly httpClient: HttpClient) {}

  public getRadars(): Observable<Radar[]> {
    return this.httpClient
      .get<RadarsAPIResponse>(`api/radars`)
      .pipe(
        map(response => response.data)
      );
  }
}
