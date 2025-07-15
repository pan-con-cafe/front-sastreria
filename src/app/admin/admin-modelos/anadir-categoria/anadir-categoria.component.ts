import { CommonModule, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-anadir-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIf, ConfirmacionSalidaComponent],
  templateUrl: './anadir-categoria.component.html',
  styleUrl: './anadir-categoria.component.css'
})

export class AnadirCategoriaComponent {
  nombreCategoria: string = '';
  modelosSeleccionados: string[] = [];
  mensajeError: string = '';
  cambiosPendientes = false;
  mostrarModal = false;
  mensajeExito = false;


  guardarCategoria() {
    if (this.modelosSeleccionados.length === 0) {
      this.mensajeError = 'Es necesario que añada algunos modelos antes de guardar';
      return;
    }

    // Aquí podrías llamar a un servicio para guardar la categoría
    this.mensajeExito = true;
    this.cambiosPendientes = false; // si usas esta lógica

    setTimeout(() => {
      this.mensajeExito = false;
    }, 10000); // 10 segundos visible
  }

  agregarModelo() {
    // Aquí puedes abrir un modal o selector. Por ahora agregamos un modelo ficticio
    this.modelosSeleccionados.push('Modelo nuevo');
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

  constructor(private router: Router) {}
}
