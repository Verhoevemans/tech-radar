import { Component, Input } from '@angular/core';

@Component({
  selector: 'radar-blip-list',
  standalone: true,
  imports: [],
  templateUrl: './blip-list.component.html',
  styleUrl: './blip-list.component.scss'
})
export class BlipListComponent {
  @Input()
  public title!: string;

  @Input()
  public blips!: string[];
}
