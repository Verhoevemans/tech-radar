import { Component, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public openModal$ = new Subject<Component>();
  public closeModal$ = new Subject<void>();

  public openModal(component: Component): void {
    this.openModal$.next(component);
  }

  public closeModal(): void {
    this.closeModal$.next();
  }
}
