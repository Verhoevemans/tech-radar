import { Component, computed, EventEmitter, Input, Output, Signal } from '@angular/core';

import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { Blip, rings } from '../../../shared/models/blip.model';
import { Radar } from '../../../shared/models/radar.model';
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
export class BlipListComponent {
  @Input({ required: true })
  public quadrant!: string;

  @Output()
  public openBlipDetails = new EventEmitter<{ blip: Blip, edit: boolean }>();

  public rings = rings;

  public higlightedBlipId: Signal<string | undefined> = this.store.state.select(state => state.highlightedBlipId());
  public radar: Signal<Radar | undefined> = this.store.state.select(state => state.radar());
  public blipsPerRing: Signal<Blip[][]> = computed(() => {
    const blipsForQuadrant = this.radar()?.blips.filter(blip => blip.quadrant === this.quadrant) || [];
    return this.rings.map(ring => {
      return blipsForQuadrant.filter(blip => blip.ring === ring) || [];
    });
  });

  public constructor(private readonly store: RadarDetailsStore) {}

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
