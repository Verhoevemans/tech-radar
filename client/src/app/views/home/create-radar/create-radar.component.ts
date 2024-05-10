import { Component } from '@angular/core';

import { ButtonComponent } from '../../../components/common/button/button.component';
import { ModalService } from '../../../components/common/modal/modal.service';
import { AuthenticationComponent } from '../../../components/core/authentication/authentication.component';

@Component({
  selector: 'rad-create-radar',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './create-radar.component.html',
  styleUrl: './create-radar.component.scss'
})
export class CreateRadarComponent {
  public constructor(private readonly modalService: ModalService) {
  }

  public openAuthenticationModal(): void {
    this.modalService.openModal(AuthenticationComponent as Component);
  }
}
