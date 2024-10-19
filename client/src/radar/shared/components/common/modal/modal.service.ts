import { Component, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ModalData } from './modal.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public openModal$ = new Subject<{ component: Component, data?: ModalData }>();
  public closeModal$ = new Subject<void>();

  public openModal(component: Component, data?: ModalData): void {
    this.openModal$.next({ component, data });
  }

  public closeModal(): void {
    this.closeModal$.next();
  }
}
