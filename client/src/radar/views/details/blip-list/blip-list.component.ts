import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { Blip, rings } from '../../../shared/models/blip.model';
import { RadarDetailsService } from '../radar-details.service';

@Component({
  selector: 'radar-blip-list',
  standalone: true,
  imports: [
    ButtonComponent
  ],
  templateUrl: './blip-list.component.html',
  styleUrl: './blip-list.component.scss'
})
export class BlipListComponent implements OnChanges, OnInit {
  @Input({ required: true })
  public quadrant!: string;

  @Input({ required: true })
  public blips!: Blip[];

  @Output()
  public openBlipDetails = new EventEmitter<Blip>();

  public blipsPerRing!: Blip[][];
  public higlightedBlipId: string | undefined;
  public rings = rings;

  public constructor(private readonly radarDetailsService: RadarDetailsService) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['blips'].currentValue) {
      this.blipsPerRing = rings.map(ring => {
        return this.blips.filter(blip => blip.ring === ring);
      });
    }
  }

  public ngOnInit(): void {
    this.radarDetailsService.highlightedBlipId.subscribe((id) => {
      this.higlightedBlipId = id;
    });
  }

  public onBlipHover(id: string | undefined): void {
    this.radarDetailsService.highLightBlip(id);
  }

  public onBlipClick(blip: Blip): void {
    this.openBlipDetails.emit(blip);
  }

  public onBlipAdd(): void {
    const blip = { quadrant: this.quadrant } as Blip;
    this.openBlipDetails.emit(blip);
  }
}
