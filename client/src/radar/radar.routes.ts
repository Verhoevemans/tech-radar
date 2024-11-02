import { Routes } from '@angular/router';

import { RadarDetailsComponent } from './views/details/radar-details.component';
import { StartComponent } from './views/start/start.component';

export const routes: Routes = [
  { path: 'home', component: StartComponent },
  { path: 'radar/:name', component: RadarDetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' as const },
  { path: '**', redirectTo: 'home' }
];
