import { Component } from '@angular/core';
import { NavbaradminComponent } from '../navbaradmin/navbaradmin.component';
import { Router, RouterModule} from '@angular/router';
import { AdminBienvenidaComponent } from '../admin-bienvenida/admin-bienvenida.component';

@Component({
  selector: 'app-admin-horario',
  standalone: true,
  imports: [NavbaradminComponent, RouterModule, AdminBienvenidaComponent],
  templateUrl: './admin-horario.component.html',
  styleUrls: ['./admin-horario.component.css']
})
export class AdminHorarioComponent {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']); 
  }
}
