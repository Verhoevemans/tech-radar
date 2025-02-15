import { InjectionToken } from '@angular/core';

export interface ModalData {
  data: any;
  onClose?: (data?: any) => void;
}

export const MODAL_DATA = new InjectionToken<ModalData>('ModalData');
