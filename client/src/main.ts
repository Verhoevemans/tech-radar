import { provideZoneChangeDetection } from "@angular/core";
import { bootstrapApplication } from '@angular/platform-browser';

import { radarConfig } from './radar/radar.config';
import { RadarComponent } from './radar/radar.component';

bootstrapApplication(RadarComponent, {...radarConfig, providers: [provideZoneChangeDetection(), ...radarConfig.providers]})
  .catch((err) => console.error(err));
