import { Component, EventEmitter, input, Output } from '@angular/core';

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
  public label = input.required<string>();
  public type = input<ButtonType>('primary');
  public size = input<ButtonSize>('medium');
  public isActive = input<boolean>(false);

  @Output()
  public clicked = new EventEmitter<void>();

  public get typeClass(): string {
    return `radar-button--${this.type()}`;
  }

  public get sizeClass(): string {
    return `radar-button--${this.size()}`;
  }

  public onClick(): void {
    this.clicked.emit();
  }
}
