import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Blip } from '../../../../shared/models/blip.model';

@Component({
  selector: 'radar-blip-details-form',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './blip-details-form.component.html',
  styleUrl: './blip-details-form.component.scss'
})
export class BlipDetailsFormComponent implements OnInit {
  @Input({ required: true })
  public blip!: Blip;

  public blipForm!: FormGroup;

  get nameControl(): FormControl {
    return this.blipForm.get('name') as FormControl;
  }

  get quadrantControl(): FormControl {
    return this.blipForm.get('quadrant') as FormControl;
  }

  public ngOnInit(): void {
    this.initializeForm();
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
