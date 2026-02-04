import { CommonModule, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../services/categoria.service'; 
import { ModalSelectorModeloComponent } from '../../../shared/modal-modelos/modal-selector-modelo.component';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { LoaderService } from '../../../shared/loader/loader.service';



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
  modelosDisponibles: any[] = [];
  idCategoria!: number;

  mostrarModalCancelar = false;
  mostrarModalSelector = false;

  cambiosPendientes: boolean = false;
  listaDeModelos: any[] = []; // Llenas esto desde tu servicio


  constructor(
    private categoriaService: CategoriaService, 
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    public loader: LoaderService,
  ) {}

  onCambios(): void {
    this.cambiosPendientes = true;
  }

  abrirModalSelector(): void {
    this.mostrarModalSelector = true;
  }

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
    this.mostrarModalSelector = false;
  }

  agregarModelos(modelos: any[]) {
    this.modelosSeleccionados = modelos;
  }

  /*ngOnInit(): void {
    this.http.get<any[]>('https://sastreria-estilo-ljge.onrender.com/api/Modelo').subscribe({
      next: (data) => {
        this.listaDeModelos = data.map(m => ({
          ...m,
          imagen: m.imagenes?.length > 0 ? m.imagenes[0] : 'https://via.placeholder.com/150'
        }));
      },
      error: (err) => console.error('Error al obtener modelos', err)
    });
  }*/

  guardarCategoria(): void {
    if (this.nombreCategoria.trim() === '') {
      this.mensajeError = 'El nombre es obligatorio.';
      return;
    }

    this.loader.show();

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
        this.cambiosPendientes = false;

        this.loader.hide();
        
        setTimeout(() => this.router.navigate(['/admin/modelos/categorias']), 1500);
      },
      error: (err) => {
        console.error('Error al añadir categoría', err);
        this.loader.hide();
      }
    });
  }

  eliminarModelo(index: number): void {
    this.modelosSeleccionados.splice(index, 1);
    this.cambiosPendientes = true;
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