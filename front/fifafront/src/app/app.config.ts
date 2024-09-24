import { ApplicationConfig, Injectable, NgModule, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    provideHttpClient( withFetch(),),
    
  ]
}

@NgModule({
  providers: [
    provideHttpClient(),
  ],
  // ... other application configuration
})

export class AppModule {}
