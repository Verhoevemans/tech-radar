import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'radar-tab',
  standalone: true,
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent implements OnInit {
  // TODO: find correct Generic typing instead of any (also in the EventEmitter)
  @Input({ required: true })
  public tabOptions!: any[];

  @Output()
  public tabSelected = new EventEmitter<any>();

  @Input()
  public activeTab!: string;

  public ngOnInit(): void {
    if (!this.activeTab) {
      this.activeTab = this.tabOptions[0];
    }
  }

  public onSelect(tab: any): void {
    this.activeTab = tab;
    this.tabSelected.emit(tab);
  }
}
