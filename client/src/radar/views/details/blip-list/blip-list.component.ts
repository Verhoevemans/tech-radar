import { Component, EventEmitter, Input, OnChanges, Output, Signal, SimpleChanges } from '@angular/core';

import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { Blip, rings } from '../../../shared/models/blip.model';
import { RadarDetailsStore } from '../radar-details.store';

@Component({
  selector: 'radar-blip-list',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './blip-list.component.html',
  styleUrl: './blip-list.component.scss'
})
export class BlipListComponent implements OnChanges {
  @Input({ required: true })
  public quadrant!: string;

  @Input({ required: true })
  public blips!: Blip[];

  @Output()
  public openBlipDetails = new EventEmitter<{ blip: Blip, edit: boolean }>();

  public blipsPerRing!: Blip[][];
  public higlightedBlipId: Signal<string | undefined> = this.store.state.select(state => state.highlightedBlipId());
  public rings = rings;

  public constructor(private readonly store: RadarDetailsStore) {}

  // TODO: should Blips be Signals instead of an input??
  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['blips'].currentValue) {
      this.blipsPerRing = rings.map(ring => {
        return this.blips.filter(blip => blip.ring === ring);
      });
    }
  }

  public onBlipHover(id: string | undefined): void {
    this.store.state.update('highlightedBlipId', id);
  }

  public onBlipClick(blip: Blip): void {
    this.openBlipDetails.emit({ blip, edit: false });
  }

  public onBlipAdd(): void {
    const blip = { quadrant: this.quadrant } as Blip;
    this.openBlipDetails.emit({ blip, edit: true });
  }
}
