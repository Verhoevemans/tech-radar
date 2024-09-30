import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  constructor(private readonly httpClient: HttpClient) {}

  public getRadarDetails(radarName: string): Observable<any> {
    return this.httpClient.get(`api/radars/${radarName}`);
  }
}
