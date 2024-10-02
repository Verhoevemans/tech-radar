import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonComponent } from '../../../../shared/components/common/button/button.component';
import { ModalService } from '../../../../shared/components/common/modal/modal.service';

import { CreateRadarModalService } from './create-radar-modal.service';
import { NotificationComponent } from '../../../../shared/components/common/notification/notification.component';

@Component({
  selector: 'radar-create-modal',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    NotificationComponent
  ],
  templateUrl: './create-radar-modal.component.html',
  styleUrl: './create-radar-modal.component.scss'
})
export class CreateRadarModalComponent implements OnInit {
  public error: string | undefined;
  public radarForm!: FormGroup;

  get nameControl(): FormControl {
    return this.radarForm.get('name') as FormControl;
  }

  get quadrants(): FormArray {
    return this.radarForm.get('quadrants') as FormArray;
  }

  constructor(private readonly createRadarModalService: CreateRadarModalService,
              private readonly modalService: ModalService,
              private readonly router: Router) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public createRadar(): void {
    this.radarForm.markAllAsTouched();

    if (this.radarForm.valid) {
      this.createRadarModalService.createRadar(this.nameControl.value, this.quadrants.value).subscribe({
        next: (radar) => {
          this.modalService.closeModal();
          this.router.navigate(['radar', radar.url]);
        },
        error: (_error) => {
          this.error = 'Something went wrong when trying to create the Radar. Please try again later.';
        },
        complete: () => {
          this.error = undefined;
        }
      });
    }
  }

  public getQuadrantControl(index: number): FormControl {
    return this.quadrants.controls[index] as FormControl;
  }

  private initializeForm(): void {
    this.radarForm = new FormGroup({
      name: new FormControl('', Validators.required),
      quadrants: new FormArray([])
    });
    for (let quadrant = 0; quadrant < 4; quadrant++) {
      this.quadrants.push(new FormControl('', Validators.required));
    }
  }
}
