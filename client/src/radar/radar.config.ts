import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './radar.routes';

export const radarConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
