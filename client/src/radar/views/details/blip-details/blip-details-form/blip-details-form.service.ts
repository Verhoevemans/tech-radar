import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Blip } from '../../../../shared/models/blip.model';
import { DetailsService } from '../../details.service';

interface CreateBlipResponse {
  success: boolean,
  data: Blip
}

@Injectable({
  providedIn: 'root'
})
export class BlipDetailsFormService {
  constructor(private readonly httpClient: HttpClient, private readonly detailsService: DetailsService) {}

  public createBlip(blip: Blip): Observable<Blip> {
    const radarName = this.detailsService.getRadarName();
    return this.httpClient
      .post<CreateBlipResponse>(`api/radars/${radarName}/blips`, { blip })
      .pipe(
        map(response => response.data)
      );
  }
}
