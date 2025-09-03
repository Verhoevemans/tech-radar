import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ButtonComponent } from '../../../../shared/components/common/button/button.component';
import { InputComponent } from '../../../../shared/components/common/input/input.component';
import { SelectComponent } from '../../../../shared/components/common/select/select.component';
import { TextareaComponent } from '../../../../shared/components/common/textarea/textarea.component';
import { Blip, rings } from '../../../../shared/models/blip.model';

@Component({
  selector: 'radar-blip-details-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonComponent,
    InputComponent,
    TextareaComponent,
    SelectComponent
  ],
  templateUrl: './blip-details-form.component.html',
  styleUrl: './blip-details-form.component.scss'
})
export class BlipDetailsFormComponent implements OnInit {
  @Input({ required: true })
  public blip!: Blip;

  @Input()
  public edit = false;

  @Output()
  private onVote = new EventEmitter<Blip>();

  @Output()
  private onSubmit = new EventEmitter<Blip>();

  public blipForm!: FormGroup;

  public rings = rings.concat();

  public get nameControl(): FormControl {
    return this.blipForm.get('name') as FormControl;
  }

  public get descriptionControl(): FormControl {
    return this.blipForm.get('description') as FormControl;
  }

  public get quadrantControl(): FormControl {
    return this.blipForm.get('quadrant') as FormControl;
  }

  public get ringControl(): FormControl {
    return this.blipForm.get('ring') as FormControl;
  }

  public get linkControl(): FormControl {
    return this.blipForm.get('link') as FormControl;
  }

  public ngOnInit(): void {
    this.initializeForm();
  }

  public cancelEdit(): void {
    this.edit = false;
  }

  public editForm(): void {
    this.edit = true;
  }

  public startVote(): void {
    this.onVote.next(this.blipForm.value);
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
      ring: new FormControl(this.blip.ring),
      link: new FormControl(this.blip.link)
    });
  }
}
