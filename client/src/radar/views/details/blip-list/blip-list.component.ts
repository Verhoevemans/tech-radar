import { Component, Input } from '@angular/core';

import { Blip } from '../../../shared/models/blip.model';

@Component({
  selector: 'radar-blip-list',
  standalone: true,
  imports: [],
  templateUrl: './blip-list.component.html',
  styleUrl: './blip-list.component.scss'
})
export class BlipListComponent {
  @Input({ required: true })
  public quadrant!: string;

  @Input({ required: true })
  public blips!: Blip[];
}
