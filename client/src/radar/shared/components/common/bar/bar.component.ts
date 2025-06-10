import { Component, Input } from '@angular/core';

@Component({
  selector: 'radar-bar',
  standalone: true,
  imports: [],
  templateUrl: './bar.component.html',
  styleUrl: './bar.component.scss'
})
export class BarComponent {
  @Input({ required: true })
  public total!: number;

  @Input({ required: true })
  public value!: number;

  public getValueWidth(): string {
    return `${(this.value / this.total) * 100}%`;
  }
}
