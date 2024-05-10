import { Component, Input } from '@angular/core';

@Component({
  selector: 'rad-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input({ required: true })
  public title!: string;
}
