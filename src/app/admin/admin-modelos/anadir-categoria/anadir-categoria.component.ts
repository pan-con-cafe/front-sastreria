import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anadir-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './anadir-categoria.component.html',
  styleUrl: './anadir-categoria.component.css'
})

export class AnadirCategoriaComponent {
  nombreCategoria: string = '';
  modelosSeleccionados: string[] = [];
  mensajeError: string = '';

  guardarCategoria() {
    if (this.modelosSeleccionados.length === 0) {
      this.mensajeError = 'Es necesario que añada algunos modelos antes de guardar';
      return;
    }

    // Aquí podrías llamar a un servicio para guardar la categoría
    console.log('Categoría guardada:', this.nombreCategoria, this.modelosSeleccionados);
    this.mensajeError = '';
  }

  agregarModelo() {
    // Aquí puedes abrir un modal o selector. Por ahora agregamos un modelo ficticio
    this.modelosSeleccionados.push('Modelo nuevo');
  }
}
