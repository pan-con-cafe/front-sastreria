import { Component } from '@angular/core';
import { NavbaradminComponent } from '../navbaradmin/navbaradmin.component';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-pedidos',
  standalone: true,
  imports: [NavbaradminComponent, RouterModule],
  templateUrl: './admin-pedidos.component.html',
  styleUrl: './admin-pedidos.component.css'
})
export class AdminPedidosComponent {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']); 
  }

}
