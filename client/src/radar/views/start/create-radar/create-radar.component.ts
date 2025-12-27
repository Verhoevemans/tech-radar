import { Component, inject } from '@angular/core';

import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { ModalService } from '../../../shared/components/core/modal/modal.service';

import { CreateRadarFormComponent } from './create-radar-form/create-radar-form.component';

@Component({
  selector: 'radar-create-radar',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './create-radar.component.html',
  styleUrl: './create-radar.component.scss'
})
export class CreateRadarComponent {
  private readonly modalService: ModalService = inject(ModalService);

  public openCreateRadarForm(): void {
    this.modalService.openModal(CreateRadarFormComponent as Component, 'Create New Radar');
  }
}
