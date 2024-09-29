import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ButtonComponent } from '../../../../components/common/button/button.component';
import { ModalService } from '../../../../components/common/modal/modal.service';

import { CreateRadarModalService } from './create-radar-modal.service';

@Component({
  selector: 'radar-create-modal',
  standalone: true,
  imports: [
    ButtonComponent,
    ReactiveFormsModule
  ],
  templateUrl: './create-radar-modal.component.html',
  styleUrl: './create-radar-modal.component.scss'
})
export class CreateRadarModalComponent implements OnInit {
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
    console.log('ngOnInit of the CreateRadarModal');
    this.initializeForm();
  }

  public createRadar(): void {
    console.log(this.radarForm);

    this.radarForm.markAllAsTouched();

    if (this.radarForm.valid) {
      this.createRadarModalService.createRadar(this.nameControl.value, this.quadrants.value).subscribe({
        next: (radar) => {
          console.log('new radar was created succesfully', radar);

          this.modalService.closeModal();
          this.router.navigate(['radar', radar.data.name.toLowerCase()]);
        },
        error: (error) => console.error(error)
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
