import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'radar-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input()
  public title: string | undefined;

  public constructor(private readonly router: Router) {}

  public toHome(): void {
    this.router.navigate(['']);
  }
}
