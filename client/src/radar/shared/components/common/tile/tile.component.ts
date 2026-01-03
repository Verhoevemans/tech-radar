import { Component, input, output } from '@angular/core';

@Component({
    selector: 'radar-tile',
    imports: [],
    templateUrl: './tile.component.html',
    styleUrl: './tile.component.scss'
})
export class TileComponent {
  public title = input.required<string>();
  public subText = input<string>();
  public clicked = output<void>();

  public onClick(): void {
    this.clicked.emit();
  }
}
