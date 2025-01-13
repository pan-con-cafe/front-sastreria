import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { enableProdMode } from '@angular/core';
import { appRoutes } from './app/app.routes';

enableProdMode();

bootstrapApplication(AppComponent, {
  providers: [provideRouter(appRoutes)],
}).catch((err) => console.error(err));

//bootstrapApplication(AppComponent, appConfig)
//  .catch((err) => console.error(err));
