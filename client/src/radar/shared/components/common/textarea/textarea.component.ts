import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'radar-textarea',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  @Input({ required: true })
  public control!: FormControl;

  @Input({ required: true })
  public label!: string;

  @Input()
  public readonly = false;
}
