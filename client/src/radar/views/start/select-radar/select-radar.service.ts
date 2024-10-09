import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Radar } from '../../../shared/models/radar.model';

interface GetRadarsResponse {
  success: boolean,
  data: Radar[]
}

@Injectable({
  providedIn: 'root'
})
export class SelectRadarService {
  constructor(private readonly httpClient: HttpClient) {}

  public getRadars(): Observable<Radar[]> {
    return this.httpClient
      .get<GetRadarsResponse>(`api/radars`)
      .pipe(
        map(response => response.data)
      );
  }
}
