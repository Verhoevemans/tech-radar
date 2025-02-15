import { Component, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ModalData } from './modal.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  public openModal$ = new Subject<{ component: Component, title: string, data?: ModalData }>();
  public closeModal$ = new Subject<void>();

  public openModal(component: Component, title: string, data?: ModalData): void {
    this.openModal$.next({ component, title, data });
  }

  public closeModal(): void {
    this.closeModal$.next();
  }
}
