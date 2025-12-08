import { CommonModule, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria.model';
import { HttpClient } from '@angular/common/http';
import { ModalSelectorModeloComponent } from '../../../shared/modal-modelos/modal-selector-modelo.component';
import { LoaderService } from '../../../shared/loader/loader.service';



@Component({
  selector: 'app-editar-categoria',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, NgIf, ConfirmacionSalidaComponent, ModalSelectorModeloComponent],
  templateUrl: './editar-categoria.component.html',
  styleUrl: './editar-categoria.component.css'
})
export class EditarCategoriaComponent implements OnInit {
  nombreCategoria: string = '';
  modelosSeleccionados: any[] = [];
  modelosDisponibles: any[] = [];
  mensajeExito: boolean = false;
  mostrarModal: boolean = false;
  mostrarModalAgregar = false;
  mostrarModalEliminar: boolean = false;
  cambiosPendientes: boolean = false;
  idCategoria!: number;

  constructor(
    private categoriaService: CategoriaService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public loader: LoaderService,
  ) {}

  ngOnInit(): void {
    this.idCategoria = this.route.snapshot.params['id'];
    
    this.categoriaService.getCategoriaById(this.idCategoria).subscribe({
      next: (categoria) => {
        this.nombreCategoria = categoria.nombre;

        this.http.get<any[]>(`https://sastreria-estilo-ljge.onrender.com/api/Modelo`)
          .subscribe({
            next: (modelos) => {

              // ✅ PRIMERO: Llenar modelosSeleccionados
              const modelosCat = modelos.filter(m => m.categorias && m.categorias.includes(this.nombreCategoria))

              this.modelosSeleccionados = modelosCat.map(m => ({
                ...m,
                imagen: m.imagenes?.[0] || 'https://via.placeholder.com/150'
              }));

              // ✅ SEGUNDO: Ahora sí cargar los disponibles (ya con modelosSeleccionados lleno)
              this.cargarModelosDisponibles();
            },
            error: (err) => console.error('Error al obtener modelos de la categoría', err)
          });
      },
      error: (err) => console.error('Error al cargar la categoría', err)
    });
  }

  cargarModelosDisponibles() {
    this.http.get<any[]>('https://sastreria-estilo-ljge.onrender.com/api/Modelo')
      .subscribe({
        next: (data) => {

          const idsActuales = this.modelosSeleccionados.map(m => m.idModelo);

          this.modelosDisponibles = data
            .filter(m => !idsActuales.includes(m.idModelo))
            .map(m => ({
              ...m,
              imagen: m.imagenes?.[0] || 'https://via.placeholder.com/150'
            }));


        },
        error: (err) => console.error('Error al obtener modelos', err)
      });
  }

  agregarModelosDesdeModal(modelos: any[]) {
    const idsActuales = this.modelosSeleccionados.map(m => m.idModelo);

    const nuevos = modelos.filter(m => !idsActuales.includes(m.idModelo));

    this.modelosSeleccionados.push(...nuevos);
    this.cargarModelosDisponibles();

    this.cambiosPendientes = true;
    this.mostrarModalAgregar = false;
  }

  onCambios(): void {
    this.cambiosPendientes = true;
  }

  agregarModelo(): void {
    this.mostrarModalAgregar = true;
  }

  eliminarModelo(index: number): void {
    this.modelosSeleccionados.splice(index, 1);
    this.cambiosPendientes = true;
  }

  guardarCambios(): void {
    const categoriaActualizada: any = {
      idCategoria: this.idCategoria,
      nombre: this.nombreCategoria,
      descripcion: 'Sin descripción',
      estado: true,
      IdsModelos: this.modelosSeleccionados.map(m => m.idModelo)
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