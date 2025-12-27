import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Blip, BlipAPIResponse } from '../../../shared/models/blip.model';

@Injectable({
  providedIn: 'root'
})
export class BlipDetailsService {
  private readonly httpClient: HttpClient = inject(HttpClient);

  public createBlip(blip: Blip, radarUrl: string): Observable<Blip> {
    return this.httpClient
      .post<BlipAPIResponse>(`${environment.apiUrl}/api/radars/${radarUrl}/blips`, { blip })
      .pipe(
        map(response => response.data)
      );
  }

  public updateBlip(blip: Blip, radarUrl: string): Observable<Blip> {
    return this.httpClient
      .put<BlipAPIResponse>(`${environment.apiUrl}/api/radars/${radarUrl}/blips/${blip.id}`, { blip })
      .pipe(
        map(response => response.data)
      );
  }
}
