import { NgComponentOutlet } from '@angular/common';
import { Component, ElementRef, OnInit, Type, ViewChild } from '@angular/core';

import { ModalService } from './modal.service';

@Component({
  selector: 'rad-modal',
  standalone: true,
  imports: [
    NgComponentOutlet
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  @ViewChild('dialog', { static: true })
  public dialog!: ElementRef<HTMLDialogElement>;

  private modalComponent: Component | undefined;

  constructor(private readonly modalService: ModalService) {}

  public ngOnInit() {
    this.modalService.openModal$.subscribe((component: Component) => {
      this.modalComponent = component;
      this.dialog.nativeElement.showModal();
    });
  }

  public closeModal(): void {
    this.dialog.nativeElement.close();
  }

  public getModalComponent(): Type<any> {
    return this.modalComponent as Type<any>;
  }
}
