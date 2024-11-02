import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { ButtonComponent } from '../../../shared/components/common/button/button.component';
import { ModalService } from '../../../shared/components/common/modal/modal.service';
import { Blip, rings } from '../../../shared/models/blip.model';
import { BlipDetailsComponent } from '../blip-details/blip-details.component';

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

  public rings = rings;
  public blipsPerRing!: Blip[][];

  @Output()
  private onBlipAdded = new EventEmitter<void>();

  public constructor(private readonly modalService: ModalService) {}

  public ngOnChanges(changes: SimpleChanges) {
    if (changes['blips'].currentValue) {
      this.blipsPerRing = rings.map(ring => {
        return this.blips.filter(blip => blip.ring === ring);
      });
    }
  }

  public addBlip(): void {
    const blip: Blip = { quadrant: this.quadrant } as Blip;
    this.modalService.openModal(BlipDetailsComponent as Component, 'Create New Blip', {
      data: blip,
      onClose: this.onCloseModal.bind(this)
    });
  }

  private onCloseModal(): void {
    this.onBlipAdded.emit();
  }
}
