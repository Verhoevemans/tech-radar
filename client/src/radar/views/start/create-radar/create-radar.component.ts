import { Component } from '@angular/core';

import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { ModalService } from '../../../shared/components/common/modal/modal.service';

import { CreateRadarFormComponent } from './create-radar-form/create-radar-form.component';

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

  public openCreateRadarForm(): void {
    this.modalService.openModal(CreateRadarFormComponent as Component);
  }
}
