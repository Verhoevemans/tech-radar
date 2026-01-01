import { Component, computed, EventEmitter, inject, input, Output, Signal } from '@angular/core';

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
  private readonly store: RadarDetailsStore = inject(RadarDetailsStore);

  public quadrant = input.required<string>();

  @Output()
  public openBlipDetails = new EventEmitter<{ blip: Blip, edit: boolean }>();

  public rings = rings;

  public higlightedBlipId: Signal<string | undefined> = this.store.state.select(state => state.highlightedBlipId());
  public radar: Signal<Radar | undefined> = this.store.state.select(state => state.radar());

  public blipsForQuadrant: Signal<Blip[]> = computed(() => {
    return this.radar()?.blips.filter(blip => blip.quadrant === this.quadrant()) || [];
  });
  public blipsPerRing: Signal<Blip[][]> = computed(() => {
    return this.rings.map(ring => {
      return this.blipsForQuadrant().filter(blip => blip.ring === ring) || [];
    });
  });
  public blipsWithoutRing: Signal<Blip[]> = computed(() => {
    return this.blipsForQuadrant().filter(blip => !blip.ring);
  });

  public onBlipHover(id: string | undefined): void {
    this.store.state.update('highlightedBlipId', id);
  }

  public onBlipClick(blip: Blip): void {
    this.openBlipDetails.emit({ blip, edit: false });
  }

  public onBlipAdd(): void {
    const blip = { quadrant: this.quadrant() } as Blip;
    this.openBlipDetails.emit({ blip, edit: true });
  }
}
