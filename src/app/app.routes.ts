import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';

import { ClienteReservaComponent } from './cliente/cliente-reserva/cliente-reserva.component';
import { ClienteDetalleComponent } from './cliente/cliente-detalle/cliente-detalle.component';
import { ClienteFinalComponent } from './cliente/cliente-final/cliente-final.component';

import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminBienvenidaComponent } from './admin/admin-bienvenida/admin-bienvenida.component';

import { ChatbotComponent } from './cliente/chatbot/chatbot.component';

import { NotfoundComponent } from './cliente/notfound/notfound.component';



export const appRoutes: Routes = [

  { path: '', redirectTo: 'inicio', pathMatch: 'full', },

  {
    path: 'inicio',
    loadComponent: () =>
      import('./inicio/inicio.component').then(m => m.InicioComponent),
  },  


  //modulo cliente
  { path: '', loadChildren: () => import('./cliente/cliente.routes').then(m => m.CLIENTE_ROUTES), },

  //modulo administrador
  { path: 'admin', loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES) },

  //login y chatbot
  { path: 'login', component: AdminLoginComponent },
  { path: 'chatbot', component: ChatbotComponent },

  // no encontrado
  { path: '**', component: NotfoundComponent },
];