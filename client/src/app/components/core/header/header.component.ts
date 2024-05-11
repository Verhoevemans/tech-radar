import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  public constructor(private readonly router: Router) {}

  public toHome(): void {
    this.router.navigate(['']);
  }
}
