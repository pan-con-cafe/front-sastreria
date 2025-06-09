// src/app/admin/admin.routes.ts
/*import { Routes } from '@angular/router';
import { AdminGeneralComponent } from './admin-general/admin-general.component';
import { AdminPedidosComponent } from './admin-pedidos/admin-pedidos.component';
import { AdminModelosComponent } from './admin-modelos/admin-modelos.component';
import { AdminHorarioComponent } from './admin-horario/admin-horario.component';
import { AdminBienvenidaComponent } from './admin-bienvenida/admin-bienvenida.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminGeneralComponent,
    children: [
      { path: 'inicio', component: AdminBienvenidaComponent },
      { path: 'general', component: AdminGeneralComponent },
      { path: 'pedidos', component: AdminPedidosComponent },
      { path: 'modelos', component: AdminModelosComponent },
      { path: 'horario', component: AdminHorarioComponent },
      { path: '', redirectTo: 'inicio', pathMatch: 'full' }
    ]
  }
];*/

import { Routes } from '@angular/router';
import { AdminBienvenidaComponent } from './admin-bienvenida/admin-bienvenida.component';
import { PerfilComponent } from './admin-general/perfil/perfil.component';


export const ADMIN_ROUTES: Routes = [
  {
    path: 'general',
    loadComponent: () =>
      import('./admin-general/admin-general.component').then(m => m.AdminGeneralComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./admin-bienvenida/admin-bienvenida.component').then(m => m.AdminBienvenidaComponent),
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./admin-general/perfil/perfil.component').then(m => m.PerfilComponent),
      },
      {
        path: 'panel-de-control',
        loadComponent: () =>
          import('./admin-general/panel-de-control/panel-de-control.component').then(m => m.PanelDeControlComponent),
      },
      {
        path: 'editar-perfil',
        loadComponent: () =>
          import('./admin-general/editar-perfil/editar-perfil.component').then(m => m.EditarPerfilComponent),
      },
    ]
  },

  {
    path: 'pedidos',
    loadComponent: () =>
      import('./admin-pedidos/admin-pedidos.component').then(m => m.AdminPedidosComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./admin-bienvenida/admin-bienvenida.component').then(m => m.AdminBienvenidaComponent),
      },
      {
        path: 'listado-pedidos',
        loadComponent: () =>
          import('./admin-pedidos/listado-pedidos/listado-pedidos.component').then(m => m.ListadoPedidosComponent),
      },
      {
        path: 'ver-pedido',
        loadComponent: () =>
          import('./admin-pedidos/ver-pedido/ver-pedido.component').then(m => m.VerPedidoComponent),
      },
    ]
  },

  {
    path: 'modelos',
    loadComponent: () =>
      import('./admin-modelos/admin-modelos.component').then(m => m.AdminModelosComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./admin-bienvenida/admin-bienvenida.component').then(m => m.AdminBienvenidaComponent),
      },
      
      {
        path: 'categorias',
        loadComponent: () =>
          import('./admin-modelos/categorias/categorias.component').then(m => m.CategoriasComponent),
      },

      {
        path: 'anadir-modelo',
        loadComponent: () =>
          import('./admin-modelos/anadir-modelo/anadir-modelo.component').then(m => m.AnadirModeloComponent),
      },

      {
        path: 'ver-modelo',
        loadComponent: () =>
          import('./admin-modelos/ver-modelo/ver-modelo.component').then(m => m.VerModeloComponent),
      },

      {
        path: 'anadir-categoria',
        loadComponent: () =>
          import('./admin-modelos/anadir-categoria/anadir-categoria.component').then(m => m.AnadirCategoriaComponent),
      },

      {
        path: 'editar-categoria',
        loadComponent: () =>
          import('./admin-modelos/editar-categoria/editar-categoria.component').then(m => m.EditarCategoriaComponent),
      },

      {
        path: 'editar-modelo',
        loadComponent: () =>
          import('./admin-modelos/editar-modelo/editar-modelo.component').then(m => m.EditarModeloComponent),
      },
    ]    
  },

  {
    path: 'horario',
    loadComponent: () =>
      import('./admin-horario/admin-horario.component').then(m => m.AdminHorarioComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./admin-bienvenida/admin-bienvenida.component').then(m => m.AdminBienvenidaComponent),
      },
      {
        path: 'ver-horario',
        loadComponent: () =>
          import('./admin-horario/ver-horario/ver-horario.component').then(m => m.VerHorarioComponent),
      },
      {
        path: 'editar-horario',
        loadComponent: () =>
          import('./admin-horario/editar-horario/editar-horario.component').then(m => m.EditarHorarioComponent),
      },
    ]
  },

  {
    path: '',
    redirectTo: 'general',
    pathMatch: 'full',
  }
];
