import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { RadarComponent } from './views/radar/radar.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'radar/:domain', component: RadarComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' as const },
  { path: '**', redirectTo: 'home' }
];
