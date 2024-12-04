import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonComponent } from '../../../../shared/components/common/button/button.component';
import { Blip, rings } from '../../../../shared/models/blip.model';

@Component({
  selector: 'radar-blip-details-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent
  ],
  templateUrl: './blip-details-form.component.html',
  styleUrl: './blip-details-form.component.scss'
})
export class BlipDetailsFormComponent implements OnInit {
  @Input({ required: true })
  public blip!: Blip;

  @Output()
  private onSubmit = new EventEmitter<Blip>();

  public blipForm!: FormGroup;

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

  public ngOnInit(): void {
    console.log('BlipDetailsFormComponent', this.blip);
    this.initializeForm();
  }

  public submitForm(): void {
    this.blipForm.markAllAsTouched();

    if (this.blipForm.valid) {
      this.onSubmit.emit(this.blipForm.value);
    }
  }

  private initializeForm(): void {
    this.blipForm = new FormGroup({
      name: new FormControl(this.blip.name, Validators.required),
      id: new FormControl(this.blip.id),
      description: new FormControl(this.blip.description),
      quadrant: new FormControl(this.blip.quadrant, Validators.required),
      ring: new FormControl(this.blip.ring, Validators.required),
      link: new FormControl(this.blip.link)
    });
  }
}
