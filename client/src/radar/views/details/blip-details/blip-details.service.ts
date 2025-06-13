import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Blip, BlipAPIResponse } from '../../../shared/models/blip.model';
import { RadarDetailsService } from '../radar-details.service';

@Injectable({
  providedIn: 'root'
})
export class BlipDetailsService {
  constructor(private readonly httpClient: HttpClient, private readonly detailsService: RadarDetailsService) {}

  public createBlip(blip: Blip): Observable<Blip> {
    const radarName = this.detailsService.getRadarName();
    return this.httpClient
      .post<BlipAPIResponse>(`api/radars/${radarName}/blips`, { blip })
      .pipe(
        map(response => response.data)
      );
  }

  public updateBlip(blip: Blip): Observable<Blip> {
    const radarName = this.detailsService.getRadarName();
    return this.httpClient
      .put<BlipAPIResponse>(`api/radars/${radarName}/blips/${blip.id}`, { blip })
      .pipe(
        map(response => response.data)
      );
  }
}
