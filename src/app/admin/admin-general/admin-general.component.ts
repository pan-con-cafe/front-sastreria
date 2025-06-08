import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavbaradminComponent } from '../navbaradmin/navbaradmin.component';

@Component({
  selector: 'app-admin-general',
  standalone: true,
  imports: [NavbaradminComponent],
  templateUrl: './admin-general.component.html',
  styleUrl: './admin-general.component.css'
})
export class AdminGeneralComponent {
  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']); 
  }
}
