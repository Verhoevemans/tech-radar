import { Routes } from '@angular/router';

import { DetailsComponent } from './views/details/details.component';
import { StartComponent } from './views/start/start.component';

export const routes: Routes = [
  { path: 'home', component: StartComponent },
  { path: 'radar/:domain', component: DetailsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' as const },
  { path: '**', redirectTo: 'home' }
];
