import { NgComponentOutlet } from '@angular/common';
import { Component, ElementRef, OnInit, Type, ViewChild } from '@angular/core';

import { ModalService } from './modal.service';

@Component({
  selector: 'radar-modal',
  standalone: true,
  imports: [
    NgComponentOutlet
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  @ViewChild('dialog', { static: true }) dialog!: ElementRef<HTMLDialogElement>;

  private modalComponent: Component | undefined;

  constructor(private readonly modalService: ModalService) {}

  public ngOnInit() {
    this.modalService.openModal$.subscribe((component: Component) => {
      console.log('opening modal');
      this.modalComponent = component;
      this.dialog.nativeElement.showModal();
    });
  }

  public closeModal(): void {
    console.log('closeModal()');
    this.dialog.nativeElement.close();
  }

  public getModalComponent(): Type<any> {
    console.log('getModalComponent()');
    return this.modalComponent as Type<any>;
  }
}
