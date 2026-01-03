import { Component, input, model, OnInit, output } from '@angular/core';

@Component({
    selector: 'radar-tab',
    imports: [],
    templateUrl: './tab.component.html',
    styleUrl: './tab.component.scss'
})
export class TabComponent implements OnInit {
  // TODO: find correct Generic typing instead of any (also in the EventEmitter)
  public tabOptions = input.required<any[]>();
  public activeTab = model<any>();
  public tabSelected = output<any>();

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
