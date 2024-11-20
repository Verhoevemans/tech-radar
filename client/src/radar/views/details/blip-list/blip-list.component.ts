import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { ModalService } from '../../../shared/components/common/modal/modal.service';
import { Blip, rings } from '../../../shared/models/blip.model';
import { BlipDetailsComponent } from '../blip-details/blip-details.component';
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

  public blipsPerRing!: Blip[][];
  public higlightedBlipId: string | undefined;
  public rings = rings;

  @Output()
  private onBlipAdded = new EventEmitter<void>();

  public constructor(private readonly modalService: ModalService, private readonly radarDetailsService: RadarDetailsService) {}

  public ngOnChanges(changes: SimpleChanges) {
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

  public addBlip(): void {
    const blip: Blip = { quadrant: this.quadrant } as Blip;
    this.modalService.openModal(BlipDetailsComponent as Component, 'Create New Blip', {
      data: blip,
      onClose: this.onCloseModal.bind(this)
    });
  }

  public onBlipHover(id: string | undefined): void {
    this.radarDetailsService.highLightBlip(id);
  }

  private onCloseModal(): void {
    this.onBlipAdded.emit();
  }
}
