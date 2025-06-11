import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ver-modelo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-modelo.component.html',
  styleUrl: './ver-modelo.component.css'
})
export class VerModeloComponent {
  modelos = [
    { id: 1, nombre: 'Modelo A', imagen: 'assets/placeholder.svg' },
    { id: 2, nombre: 'Modelo B', imagen: 'assets/placeholder.svg' },
    { id: 3, nombre: 'Modelo C', imagen: 'assets/placeholder.svg' },
    { id: 4, nombre: 'Modelo D', imagen: 'assets/placeholder.svg' },
    { id: 5, nombre: 'Modelo E', imagen: 'assets/placeholder.svg' },
    // puedes continuar con más datos simulados
  ];

}
