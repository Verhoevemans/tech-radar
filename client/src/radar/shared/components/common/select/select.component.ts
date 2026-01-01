import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { rings } from '../../../models/blip.model';

@Component({
  selector: 'radar-select',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss'
})
export class SelectComponent {
  public control = input.required<FormControl>();
  public label = input.required<string>();
  public options = input.required<string[]>();
  public readonly = input(false);

  public showOptions = false;

  protected readonly rings = rings;

  public closeOptions(): void {
    this.showOptions = false;
  }

  public openOptions(): void {
    if (!this.readonly()) {
      this.showOptions = true;
    }
  }

  public selectOption(option: string): void {
    this.control().patchValue(option);
    this.closeOptions();
  }
}
