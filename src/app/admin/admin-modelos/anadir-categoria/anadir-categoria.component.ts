import { CommonModule, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CategoriaService } from '../services/categoria.service'; 


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
  mensajeExito: boolean = false;
  mensajeError: string = '';
  mostrarModal: boolean = false;
  cambiosPendientes: boolean = false;

  constructor(private categoriaService: CategoriaService, private router: Router) {}

  onCambios(): void {
    this.cambiosPendientes = true;
  }

  agregarModelo(): void {
    this.modelosSeleccionados.push('Modelo ' + (this.modelosSeleccionados.length + 1));
    this.cambiosPendientes = true;
  }

  guardarCategoria(): void {
    if (this.nombreCategoria.trim() === '') {
      this.mensajeError = 'El nombre es obligatorio.';
      return;
    }
    const nuevaCategoria = {
      idCategoria: 0,
      nombre: this.nombreCategoria,
      descripcion: 'Sin descripción por ahora',
      estado: true
    };

    this.categoriaService.createCategoria(nuevaCategoria).subscribe({
      next: () => {
        this.mensajeExito = true;
        setTimeout(() => this.router.navigate(['/admin/modelos/categorias']), 1500);
      },
      error: (err) => console.error('Error al añadir categoría', err)
    });
  }

  cancelar(): void {
    if (this.cambiosPendientes) {
      this.mostrarModal = true;
    } else {
      this.router.navigate(['/admin/modelos/categorias']);
    }
  }

  confirmarSalida(): void {
    this.router.navigate(['/admin/modelos/categorias']);
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }
}