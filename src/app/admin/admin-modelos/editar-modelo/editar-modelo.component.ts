import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editar-modelo',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './editar-modelo.component.html',
  styleUrl: './editar-modelo.component.css'
})
export class EditarModeloComponent {
  modelos = [
    { id: 1, nombre: 'Modelo A', imagen: 'assets/placeholder.svg' },
    { id: 2, nombre: 'Modelo B', imagen: 'assets/placeholder.svg' },
    { id: 3, nombre: 'Modelo C', imagen: 'assets/placeholder.svg' },
    // Agrega más si los necesitas
  ];
}
