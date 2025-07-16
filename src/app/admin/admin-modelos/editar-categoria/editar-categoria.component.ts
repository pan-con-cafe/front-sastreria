import { CommonModule, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria.model';

@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, NgIf, ConfirmacionSalidaComponent],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css'
})
export class EditarCategoriaComponent implements OnInit {
  nombreCategoria: string = '';
  modelosSeleccionados: string[] = [];
  mensajeExito: boolean = false;
  mostrarModal: boolean = false;
  mostrarModalEliminar: boolean = false;
  cambiosPendientes: boolean = false;
  idCategoria!: number;

  constructor(private categoriaService: CategoriaService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idCategoria = this.route.snapshot.params['id'];
    this.categoriaService.getCategoriaById(this.idCategoria).subscribe({
      next: (categoria) => {
        this.nombreCategoria = categoria.nombre;
      },
      error: (err) => console.error('Error al cargar la categoría', err)
    });
  }

  onCambios(): void {
    this.cambiosPendientes = true;
  }

  agregarModelo(): void {
    this.modelosSeleccionados.push('Modelo ' + (this.modelosSeleccionados.length + 1));
    this.cambiosPendientes = true;
  }

  eliminarModelo(index: number): void {
    this.modelosSeleccionados.splice(index, 1);
    this.cambiosPendientes = true;
  }

  guardarCambios(): void {
    const categoriaActualizada: Categoria = {
      idCategoria: this.idCategoria,
      nombre: this.nombreCategoria,
      descripcion: 'Sin descripción por ahora',
      estado: true
    };

    this.categoriaService.updateCategoria(this.idCategoria, categoriaActualizada).subscribe({
      next: () => {
        this.mensajeExito = true;
        this.cambiosPendientes = false;
        setTimeout(() => this.router.navigate(['/admin/modelos/categorias']), 1500);
      },
      error: (err) => console.error('Error al actualizar categoría', err)
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

  confirmarEliminacion(): void {
    this.mostrarModalEliminar = true;
  }

  eliminarCategoria(): void {
    this.categoriaService.deleteCategoria(this.idCategoria).subscribe({
      next: () => {
        this.router.navigate(['/admin/modelos/categorias']);
      },
      error: (err) => console.error('Error al eliminar categoría', err)
    });
  }

  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;
  }
}