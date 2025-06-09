import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  adminCredentials = {
    email: '',
    password: '',
  };

  errorMessage: string | null = null;

  constructor(private router: Router) {}

  onSubmit() {
    const validEmail = 'pancito@prueba.com';
    const validPassword = 'pancito';

    if (
      this.adminCredentials.email === validEmail &&
      this.adminCredentials.password === validPassword
    ) {
      this.errorMessage = null;
      this.router.navigate(['admin/general']); // Redirige a admin-general
    } else {
      this.errorMessage = 'Credenciales incorrectas. Intente nuevamente.';
    }
  }
}
