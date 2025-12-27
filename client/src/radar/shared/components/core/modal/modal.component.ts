import { NgComponentOutlet } from '@angular/common';
import { Component, ElementRef, inject, Injector, OnInit, Type, ViewChild } from '@angular/core';

import { ButtonComponent } from '../../common/button/button.component';

import { MODAL_DATA } from './modal.model';
import { ModalService } from './modal.service';

@Component({
  selector: 'radar-modal',
  standalone: true,
  imports: [
    NgComponentOutlet,
    ButtonComponent
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  private readonly modalService: ModalService = inject(ModalService);

  @ViewChild('dialog', { static: true })
  public dialog!: ElementRef<HTMLDialogElement>;

  public dataInjector: Injector | undefined;
  public title!: string;

  private modalComponent: Component | undefined;

  public ngOnInit() {
    this.modalService.openModal$.subscribe(({ component, title, data }) => {
      this.title = title;
      this.modalComponent = component;

      this.dataInjector = Injector.create({
        providers: [{ provide: MODAL_DATA, useValue: data }]
      });

      this.dialog.nativeElement.showModal();
    });

    this.modalService.closeModal$.subscribe(() => {
      this.closeModal();
    });
  }

  public closeModal(): void {
    this.modalComponent = undefined;
    this.dialog.nativeElement.close();
  }

  public getModalComponent(): Type<any> {
    return this.modalComponent as Type<any>;
  }
}
