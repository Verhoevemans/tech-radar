import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'radar-input',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './input.component.html',
    styleUrl: './input.component.scss'
})
export class InputComponent {
  public control = input.required<FormControl>();
  public label = input.required<string>();
  public readonly = input(false);
}
