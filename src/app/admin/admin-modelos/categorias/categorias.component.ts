import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css'
})
export class CategoriasComponent {
  categorias: string[] = [
    'Para damas',
    'Para caballeros',
    'Para niños',
    'Los más populares',
    'Lo nuevo',
    'Ver todos'
  ];
}
