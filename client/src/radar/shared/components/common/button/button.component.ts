import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'radar-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input({ required: true })
  public label!: string;

  @Output()
  public clicked = new EventEmitter<void>();

  public onClick(): void {
    this.clicked.emit();
  }
}
