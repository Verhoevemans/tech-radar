import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'rad-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input({ required: true })
  label!: string;

  @Output()
  clicked = new EventEmitter<void>();

  public onClick(): void {
    this.clicked.emit();
  }
}
