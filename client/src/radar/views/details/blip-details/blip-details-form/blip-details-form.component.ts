import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonComponent } from '../../../../shared/components/common/button/button.component';
import { ModalService } from '../../../../shared/components/common/modal/modal.service';
import { NotificationComponent } from '../../../../shared/components/common/notification/notification.component';
import { SpinnerComponent } from '../../../../shared/components/common/spinner/spinner.component';
import { Blip, rings } from '../../../../shared/models/blip.model';

import { BlipDetailsFormService } from './blip-details-form.service';

@Component({
  selector: 'radar-blip-details-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    NotificationComponent,
    SpinnerComponent
  ],
  templateUrl: './blip-details-form.component.html',
  styleUrl: './blip-details-form.component.scss'
})
export class BlipDetailsFormComponent implements OnInit {
  @Input({ required: true })
  public blip!: Blip;

  public blipForm!: FormGroup;
  public error: string | undefined;
  public loading = false;
  public rings = rings;

  get nameControl(): FormControl {
    return this.blipForm.get('name') as FormControl;
  }

  get quadrantControl(): FormControl {
    return this.blipForm.get('quadrant') as FormControl;
  }

  get ringControl(): FormControl {
    return this.blipForm.get('ring') as FormControl;
  }

  constructor(private readonly blipDetailsFormService: BlipDetailsFormService,
              private readonly modalService: ModalService) {}

  public ngOnInit(): void {
    this.initializeForm();
  }

  public createBlip(): void {
    this.blipForm.markAllAsTouched();

    if (this.blipForm.valid) {
      this.loading = true;
      this.blipDetailsFormService.createBlip(this.blipForm.value).subscribe({
        next: (blip) => {
          // TODO: how do I update the state in the DetailsComponent?
          console.log('blip was created', blip);
          // TODO: shouldn't the blip-details component close the modal, instead of this form-component?
          this.modalService.closeModal();
        },
        error: (_error) => {
          this.loading = false;
          this.error = 'Something went wrong when trying to create the Blip. Please try again later.';
        },
        complete: () => {
          this.loading = false;
          this.error = undefined;
        }
      });
    }
  }

  private initializeForm(): void {
    this.blipForm = new FormGroup({
      name: new FormControl(this.blip.name, Validators.required),
      description: new FormControl(this.blip.description),
      quadrant: new FormControl(this.blip.quadrant, Validators.required),
      ring: new FormControl(this.blip.ring, Validators.required),
      link: new FormControl(this.blip.link)
    });
  }
}
