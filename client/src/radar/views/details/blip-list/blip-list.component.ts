import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { ModalService } from '../../../shared/components/common/modal/modal.service';
import { Blip } from '../../../shared/models/blip.model';
import { BlipDetailsComponent } from '../blip-details/blip-details.component';

@Component({
  selector: 'radar-blip-list',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './blip-list.component.html',
  styleUrl: './blip-list.component.scss'
})
export class BlipListComponent {
  @Input({ required: true })
  public quadrant!: string;

  @Input({ required: true })
  public blips!: Blip[];

  @Output()
  private onBlipAdded = new EventEmitter<void>();

  public constructor(private readonly modalService: ModalService) {}

  public addBlip(): void {
    const blip: Blip = { quadrant: this.quadrant } as Blip;
    this.modalService.openModal(BlipDetailsComponent as Component, 'Create New Blip', {
      data: blip,
      onClose: this.onCloseModal.bind(this)
    });
  }

  private onCloseModal(): void {
    this.onBlipAdded.emit();
  }
}
