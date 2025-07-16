import { Component } from '@angular/core';
import { NavbaradminComponent } from '../navbaradmin/navbaradmin.component';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-modelos',
  standalone: true,
  imports: [NavbaradminComponent, RouterModule],
  templateUrl: './admin-modelos.component.html',
  styleUrl: './admin-modelos.component.css'
})
export class AdminModelosComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
