import { CommonModule, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CategoriaService } from '../services/categoria.service'; 
import { ModalSelectorModeloComponent } from '../../../shared/modal-modelos/modal-selector-modelo.component';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-anadir-categoria',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, NgIf, ConfirmacionSalidaComponent, ModalSelectorModeloComponent],
  templateUrl: './anadir-categoria.component.html',
  styleUrl: './anadir-categoria.component.css'
})

export class AnadirCategoriaComponent {
  nombreCategoria: string = '';
  modelosSeleccionados: any[] = [];
  mensajeExito: boolean = false;
  mensajeError: string = '';


  mostrarModalCancelar = false;
  mostrarModalSelector = false;

  cambiosPendientes: boolean = false;
  listaDeModelos: any[] = []; // Llenas esto desde tu servicio


  constructor(private categoriaService: CategoriaService, private router: Router, private http: HttpClient) {}

  onCambios(): void {
    this.cambiosPendientes = true;
  }

  abrirModalSelector(): void {
    this.mostrarModalSelector = true;
  }

  agregarModelos(modelos: any[]) {
    this.modelosSeleccionados = modelos;
  }

  ngOnInit(): void {
    this.http.get<any[]>('https://sastreria-estilo-ljge.onrender.com/api/Modelo').subscribe({
      next: (data) => {
        this.listaDeModelos = data.map(m => ({
          ...m,
          imagen: m.imagenes?.length > 0 ? m.imagenes[0] : 'https://via.placeholder.com/150'
        }));
      },
      error: (err) => console.error('Error al obtener modelos', err)
    });
  }

  guardarCategoria(): void {
    if (this.nombreCategoria.trim() === '') {
      this.mensajeError = 'El nombre es obligatorio.';
      return;
    }

    //const idsModelosSeleccionados = this.modelosSeleccionados.map(m => m.idModelo);

    const nuevaCategoria = {
      idCategoria: 0,
      nombre: this.nombreCategoria,
      descripcion: 'Sin descripción por ahora',
      estado: true,
      IdsModelos: this.modelosSeleccionados.map(m => m.idModelo)
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
      this.mostrarModalCancelar = true;
    } else {
      this.router.navigate(['/admin/modelos/categorias']);
    }
  }

  confirmarSalida(): void {
    this.router.navigate(['/admin/modelos/categorias']);
  }

  cerrarModalCancelar(): void {
    this.mostrarModalCancelar = false;
  }
}