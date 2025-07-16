import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  correo: string = '';
  contrasenia: string = '';

  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(): void {
    this.authService.login({ correo: this.correo, contrasenia: this.contrasenia })
      .subscribe({
        next: () => {
          this.router.navigate(['/admin/general']); // cambia la ruta a donde quieras ir al iniciar sesión
        },
        error: () => {
          this.errorMessage = 'Credenciales incorrectas. Intente nuevamente.';
        }
      });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
