import { Component, Input } from '@angular/core';

import { HeaderComponent } from '../../components/core/header/header.component';

import { TechnologyListComponent } from './technology-list/technology-list.component';

@Component({
  selector: 'rad-radar',
  standalone: true,
  imports: [
    HeaderComponent,
    TechnologyListComponent
  ],
  templateUrl: './radar.component.html',
  styleUrl: './radar.component.scss'
})
export class RadarComponent {
  @Input()
  public domain!: string;

  public radar = {
    name: 'Front-end',
    groups: ['Languages & Frameworks', 'Platforms', 'Tools', 'Techniques'],
    technologies: [
      { name: 'Angular', group: 'Languages & Frameworks', position: 'Adopt' },
      { name: 'React', group: 'Languages & Frameworks', position: 'Assess' },
      { name: 'NodeJS', group: 'Platforms', position: 'Adopt' },
      { name: 'Jest', group: 'Tools', position: 'Adopt' },
      { name: 'Webpack', group: 'Tools', position: 'Assess' },
      { name: 'Web Components', group: 'Techniques', position: 'Assess' }
    ]
  };

  public get headerTitle(): string {
    return `${ this.domain.toUpperCase() } Radar`;
  }

  public getTechnologies(group: string): string[] {
    return this.radar.technologies
      .filter((technology) => technology.group === group)
      .map((technology) => technology.name);
  }
}
