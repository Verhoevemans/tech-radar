import { bootstrapApplication } from '@angular/platform-browser';
import { radarConfig } from './radar/radar.config';
import { RadarComponent } from './radar/radar.component';

bootstrapApplication(RadarComponent, radarConfig)
  .catch((err) => console.error(err));
