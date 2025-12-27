import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'radar-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private readonly router: Router = inject(Router);

  @Input()
  public title: string | undefined;

  public toHome(): void {
    this.router.navigate(['']);
  }
}
