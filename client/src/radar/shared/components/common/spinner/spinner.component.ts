import { Component, input } from '@angular/core';

export type SpinnerType = 'load' | 'save';

@Component({
  selector: 'radar-spinner',
  standalone: true,
  imports: [],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  public type = input<SpinnerType>('load');

  public get message(): string {
    switch (this.type()) {
      case 'save':
        return 'Saving Data...';
      case 'load':
      default:
        return 'Data is loading...';
    }
  }
}
