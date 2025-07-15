import { CommonModule, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, NgIf, ConfirmacionSalidaComponent],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css'
})
export class EditarCategoriaComponent {
  nombreCategoria: string = '';
  modelosSeleccionados: string[] = ['modelo1', 'modelo2', 'modelo3', 'modelo4', 'modelo5'];
  cambiosPendientes = false;
  mostrarModal = false;
  mostrarModalEliminar = false;  // Para controlar el modal
  mensajeExito = false;


  guardarCambios() {
    console.log('Cambios guardados:', this.nombreCategoria, this.modelosSeleccionados);
    this.mensajeExito = true;
    this.cambiosPendientes = false; // si usas esta lógica

    setTimeout(() => {
      this.mensajeExito = false;
    }, 10000); // 10 segundos visible
  }

  eliminarModelo(index: number) {
    this.modelosSeleccionados.splice(index, 1);
  }

  agregarModelo() {
    // Simulación de adición
    this.modelosSeleccionados.push('modelo nuevo');
  }

  onCambios() {
    this.cambiosPendientes = true;
  }

  cancelar() {
    if (this.cambiosPendientes) {
      this.mostrarModal = true;
    } else {
      this.router.navigate(['/admin/modelos/categorias']); // Cambia esta ruta si tu vista destino es diferente
    }
  }

  confirmarSalida() {
    this.mostrarModal = false;
    this.router.navigate(['/admin/modelos/categorias']);
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  @HostListener('window:beforeunload', ['$event'])
  manejarCierreNavegador(event: BeforeUnloadEvent) {
    if (this.cambiosPendientes) {
      event.preventDefault();
      event.returnValue = true;
    }
  }

  confirmarEliminacion() {
    this.mostrarModalEliminar = true;
  }

  cerrarModalEliminar() {
    this.mostrarModalEliminar = false;
  }

  eliminarCategoria() {
    // Aquí va la lógica real para eliminar la categoría
    console.log('Categoría eliminada');
    this.mostrarModalEliminar = false;
  }


  constructor(private router: Router) {}

}
