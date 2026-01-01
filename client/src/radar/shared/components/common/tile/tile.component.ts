import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'radar-tile',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent {
  public title = input.required<string>();
  public subText = input<string>();

  @Output()
  public clicked = new EventEmitter<void>();

  public onClick(): void {
    this.clicked.emit();
  }
}
