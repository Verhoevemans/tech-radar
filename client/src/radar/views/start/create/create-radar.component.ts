import { Component } from '@angular/core';

import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { ModalService } from '../../../shared/components/common/modal/modal.service';

import { CreateRadarModalComponent } from './create-radar-modal/create-radar-modal.component';

@Component({
  selector: 'radar-create',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './create-radar.component.html',
  styleUrl: './create-radar.component.scss'
})
export class CreateRadarComponent {
  public constructor(private readonly modalService: ModalService) {}

  public openCreateRadarModal(): void {
    this.modalService.openModal(CreateRadarModalComponent as Component);
  }
}
