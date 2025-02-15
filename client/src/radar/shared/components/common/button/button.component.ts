import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonType = 'primary' | 'secondary';
type ButtonSize = 'small' | 'medium' | 'large';

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

  @Input()
  public type: ButtonType = 'primary';

  @Input()
  public size: ButtonSize = 'medium';

  @Output()
  public clicked = new EventEmitter<void>();

  public onClick(): void {
    this.clicked.emit();
  }
}
