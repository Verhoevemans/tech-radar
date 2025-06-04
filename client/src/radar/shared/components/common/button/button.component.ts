import { Component, EventEmitter, Input, Output } from '@angular/core';

type ButtonType = 'primary' | 'secondary' | 'icon';
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

  @Input()
  public isActive = false;

  @Output()
  public clicked = new EventEmitter<void>();

  public get typeClass(): string {
    return `radar-button--${this.type}`;
  }

  public get sizeClass(): string {
    return `radar-button--${this.size}`;
  }

  public onClick(): void {
    this.clicked.emit();
  }
}
