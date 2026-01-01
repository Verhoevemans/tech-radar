import { Component, EventEmitter, input, model, OnInit, Output } from '@angular/core';

@Component({
  selector: 'radar-tab',
  standalone: true,
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss'
})
export class TabComponent implements OnInit {
  // TODO: find correct Generic typing instead of any (also in the EventEmitter)
  public tabOptions = input.required<any[]>();
  public activeTab = model<any>();

  @Output()
  public tabSelected = new EventEmitter<any>();

  public ngOnInit(): void {
    if (!this.activeTab()) {
      this.activeTab.set(this.tabOptions()[0]);
    }
  }

  public onSelect(tab: any): void {
    this.activeTab.set(tab);
    this.tabSelected.emit(tab);
  }
}
