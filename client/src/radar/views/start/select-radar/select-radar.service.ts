import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectRadarService {
  constructor(private readonly httpClient: HttpClient) {}

  public getRadars(): Observable<any> {
    return this.httpClient.get(`api/radars`);
  }
}
