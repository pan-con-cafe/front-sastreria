import { Routes } from '@angular/router';
import { ClienteReservaComponent } from './cliente-reserva/cliente-reserva.component';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';
import { ClienteFinalComponent } from './cliente-final/cliente-final.component';

export const CLIENTE_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./cliente-home.component').then(m => m.ClienteHomeComponent),
    children: [
      /*{
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },*/
      {
        path: '',
        loadComponent: () =>
          import('../inicio/inicio.component').then(m => m.InicioComponent),
      },
      {
        path: 'contacto',
        loadComponent: () =>
          import('./cliente-contacto/cliente-contacto.component').then(m => m.ClienteContactoComponent),
      },
      {
        path: 'modelo',
        loadComponent: () =>
          import('./cliente-modelo/cliente-modelo.component').then(m => m.ClienteModeloComponent),
      },
      {
        path: 'nosotros',
        loadComponent: () =>
          import('./cliente-nosotros/cliente-nosotros.component').then(m => m.ClienteNosotrosComponent),
      },
      {
        path: 'reserva/:id',
        loadComponent: () =>
          import('./cliente-reserva/cliente-reserva.component').then(m => m.ClienteReservaComponent),
      },
      {
        path: 'detalle/:id',
        loadComponent: () =>
          import('./cliente-detalle/cliente-detalle.component').then(m => m.ClienteDetalleComponent),
      },
      {
        path: 'servicios',
        loadComponent: () =>
          import('./cliente-servicios/cliente-servicios.component').then(m => m.ClienteServiciosComponent),
      },
      {
        path: 'final',
        loadComponent: () =>
          import('./cliente-final/cliente-final.component').then(m => m.ClienteFinalComponent),
      },
    ]
  },
  { path: 'reserva/:id', component: ClienteReservaComponent },
  { path: 'detalle/:id', component: ClienteDetalleComponent },
  { path: 'reservado', component: ClienteFinalComponent },
];
