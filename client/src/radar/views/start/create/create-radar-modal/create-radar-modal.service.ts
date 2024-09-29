import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreateRadarModalService {
  constructor(private readonly httpClient: HttpClient) {}

  public createRadar(name: string, quadrants: string[]): Observable<any> {
    return this.httpClient.post('api/radars', { name, quadrants });
  }
}
