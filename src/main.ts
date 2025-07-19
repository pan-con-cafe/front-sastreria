import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { enableProdMode } from '@angular/core';
import { appRoutes } from './app/app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

enableProdMode();

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(withInterceptors([
      (req, next) => {
        const token = localStorage.getItem('token');

        if (req.url.includes('cloudinary.com')) {
          return next(req);
        }

        const authReq = req.clone({
          setHeaders: token ? { Authorization: `Bearer ${token}` } : {}
        });
        return next(authReq);
      }
    ]))
  ]
}).catch((err) => console.error(err));
