import { Component, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public openModal$ = new Subject<Component>();

  public openModal(component: Component): void {
    this.openModal$.next(component);
  }
}
