import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonComponent } from '../../../../shared/components/common/button/button.component';
import { ModalService } from '../../../../shared/components/core/modal/modal.service';

import { CreateRadarFormService } from './create-radar-form.service';
import { NotificationComponent } from '../../../../shared/components/common/notification/notification.component';
import { SpinnerComponent } from '../../../../shared/components/common/spinner/spinner.component';
import { InputComponent } from '../../../../shared/components/common/input/input.component';
import { TextareaComponent } from '../../../../shared/components/common/textarea/textarea.component';

@Component({
  selector: 'radar-create-form',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule,
    NotificationComponent,
    SpinnerComponent,
    InputComponent,
    TextareaComponent
  ],
  templateUrl: './create-radar-form.component.html',
  styleUrl: './create-radar-form.component.scss'
})
export class CreateRadarFormComponent implements OnInit {
  public error: string | undefined;
  public loading = false;
  public radarForm!: FormGroup;

  public get descriptionControl(): FormControl {
    return this.radarForm.get('description') as FormControl;
  }

  public get nameControl(): FormControl {
    return this.radarForm.get('name') as FormControl;
  }

  public get quadrants(): FormArray {
    return this.radarForm.get('quadrants') as FormArray;
  }

  constructor(private readonly createRadarFormService: CreateRadarFormService,
              private readonly modalService: ModalService,
              private readonly router: Router) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public createRadar(): void {
    this.radarForm.markAllAsTouched();

    if (this.radarForm.valid) {
      this.loading = true;
      this.createRadarFormService.createRadar(this.nameControl.value, this.quadrants.value, this.descriptionControl.value).subscribe({
        next: (radar) => {
          this.modalService.closeModal();
          this.router.navigate(['radar', radar.url]);
        },
        error: (_error) => {
          this.loading = false;
          this.error = 'Something went wrong when trying to create the Radar. Please try again later.';
        },
        complete: () => {
          this.loading = false;
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
      quadrants: new FormArray([]),
      description: new FormControl('')
    });
    for (let quadrant = 0; quadrant < 4; quadrant++) {
      this.quadrants.push(new FormControl('', Validators.required));
    }
  }
}
