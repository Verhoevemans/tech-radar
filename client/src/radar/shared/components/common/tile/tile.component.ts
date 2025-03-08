import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'radar-tile',
  standalone: true,
  imports: [],
  templateUrl: './tile.component.html',
  styleUrl: './tile.component.scss'
})
export class TileComponent {
  @Input({ required: true })
  public title!: string;

  @Input()
  public subText: string | undefined;

  @Output()
  public clicked = new EventEmitter<void>();

  public onClick(): void {
    this.clicked.emit();
  }
}
