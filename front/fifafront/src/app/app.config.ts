import { ApplicationConfig, Injectable, NgModule, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// importaciones para la conexion con el Backend
import { routes } from './app.routes';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    provideHttpClient( withFetch(),),
    
  ]
}
//poner para asegurar la conexion con el backend
@NgModule({
  providers: [
    provideHttpClient(),
  ],
  // ... other application configuration
})

export class AppModule {}
