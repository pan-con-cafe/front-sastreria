import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css'
})
export class EditarCategoriaComponent {
  nombreCategoria: string = 'Para Dama';
  modelosSeleccionados: string[] = ['modelo1', 'modelo2', 'modelo3', 'modelo4', 'modelo5'];

  guardarCambios() {
    console.log('Cambios guardados:', this.nombreCategoria, this.modelosSeleccionados);
  }

  eliminarCategoria() {
    console.log('Categoría eliminada');
  }

  eliminarModelo(index: number) {
    this.modelosSeleccionados.splice(index, 1);
  }

  agregarModelo() {
    // Simulación de adición
    this.modelosSeleccionados.push('modelo nuevo');
  }
}
