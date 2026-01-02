import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'radar-textarea',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './textarea.component.html',
    styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  public control = input.required<FormControl>();
  public label = input.required<string>();
  public readonly = input<boolean>(false);
}
