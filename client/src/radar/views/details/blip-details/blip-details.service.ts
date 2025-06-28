import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Blip, BlipAPIResponse } from '../../../shared/models/blip.model';

@Injectable({
  providedIn: 'root'
})
export class BlipDetailsService {
  constructor(private readonly httpClient: HttpClient) {}

  public createBlip(blip: Blip, radarUrl: string): Observable<Blip> {
    return this.httpClient
      .post<BlipAPIResponse>(`api/radars/${radarUrl}/blips`, { blip })
      .pipe(
        map(response => response.data)
      );
  }

  public updateBlip(blip: Blip, radarUrl: string): Observable<Blip> {
    return this.httpClient
      .put<BlipAPIResponse>(`api/radars/${radarUrl}/blips/${blip.id}`, { blip })
      .pipe(
        map(response => response.data)
      );
  }
}
