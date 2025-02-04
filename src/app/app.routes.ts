import { Routes } from '@angular/router';
import { ClienteContactoComponent } from './cliente/cliente-contacto/cliente-contacto.component';
import { ClienteModeloComponent } from './cliente/cliente-modelo/cliente-modelo.component';
import { ClienteNosotrosComponent } from './cliente/cliente-nosotros/cliente-nosotros.component';
import { ClienteReservaComponent } from './cliente/cliente-reserva/cliente-reserva.component';
import { ClienteServiciosComponent } from './cliente/cliente-servicios/cliente-servicios.component';
import { ClienteDetalleComponent } from './cliente/cliente-detalle/cliente-detalle.component';
import { InicioComponent } from './inicio/inicio.component';
import { NotfoundComponent } from './cliente/notfound/notfound.component';
import { NavbarComponent } from './cliente/navbar/navbar.component';
import { ClienteFinalComponent } from './cliente/cliente-final/cliente-final.component';

import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminGeneralComponent } from './admin/admin-general/admin-general.component';
import { NavbaradminComponent } from './admin/navbaradmin/navbaradmin.component';

import { ChatbotComponent } from './cliente/chatbot/chatbot.component';




export const appRoutes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'contacto', component: ClienteContactoComponent },
  { path: 'modelo', component: ClienteModeloComponent },
  { path: 'nosotros', component: ClienteNosotrosComponent },
  { path: 'reserva/:id', component: ClienteReservaComponent },
  { path: 'servicios', component: ClienteServiciosComponent },
  { path: 'detalle/:id', component: ClienteDetalleComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'reservado', component: ClienteFinalComponent },

  { path: 'login', component: AdminLoginComponent },
  { path: 'general', component: AdminGeneralComponent },
  
  { path: 'chatbot', component: ChatbotComponent },


  { path: '**', component: NotfoundComponent },
];
