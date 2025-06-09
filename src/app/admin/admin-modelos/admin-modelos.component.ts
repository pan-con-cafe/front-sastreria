import { Component } from '@angular/core';
import { NavbaradminComponent } from '../navbaradmin/navbaradmin.component';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-modelos',
  standalone: true,
  imports: [NavbaradminComponent, RouterModule],
  templateUrl: './admin-modelos.component.html',
  styleUrl: './admin-modelos.component.css'
})
export class AdminModelosComponent {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']); 
  }

}
