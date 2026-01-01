import { Component, input } from '@angular/core';

@Component({
  selector: 'radar-bar',
  standalone: true,
  imports: [],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss'
})
export class BarComponent {
  public total = input.required<number>();

  public value = input.required<number>();

  public getValueWidth(): string {
    return `${(this.value() / this.total()) * 100}%`;
  }
}
