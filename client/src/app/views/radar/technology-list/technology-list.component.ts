import { Component, Input } from '@angular/core';

@Component({
  selector: 'rad-technology-list',
  standalone: true,
  imports: [],
  templateUrl: './technology-list.component.html',
  styleUrl: './technology-list.component.scss'
})
export class TechnologyListComponent {
  @Input()
  public title!: string;

  @Input()
  public technologies!: string[];
}
