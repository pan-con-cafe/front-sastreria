import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NavbaradminComponent } from '../navbaradmin/navbaradmin.component';
import { AdminBienvenidaComponent } from '../admin-bienvenida/admin-bienvenida.component';

@Component({
  selector: 'app-admin-general',
  standalone: true,
  imports: [NavbaradminComponent, RouterModule, RouterLink, AdminBienvenidaComponent],
  templateUrl: './admin-general.component.html',
  styleUrls: ['./admin-general.component.css']
})
export class AdminGeneralComponent {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']); 
  }
}
