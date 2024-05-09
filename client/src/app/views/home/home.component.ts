import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ButtonComponent } from '../../components/common/button/button.component';
import { ModalService } from '../../components/common/modal/modal.service';
import { SetupRadarComponent } from '../../components/core/setup-radar/setup-radar.component';
import { AnalyzeComponent } from '../../components/core/analyze/analyze.component';
import { HeaderComponent } from '../../components/core/header/header.component';

@Component({
  selector: 'radar-home',
  standalone: true,
  imports: [
    ButtonComponent,
    HeaderComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  public constructor(private readonly router: Router, private readonly modalService: ModalService) {
  }

  public openRadar(): void {
    // this.router.navigate(['radar', 'some-radar']);
    this.modalService.openModal(SetupRadarComponent as Component);
  }

  public openAnotherRadar(): void {
    this.modalService.openModal(AnalyzeComponent as Component);
  }
}
