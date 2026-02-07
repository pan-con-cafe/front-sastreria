import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';
import { LoaderService } from '../../../shared/loader/loader.service';


@Component({
  selector: 'app-editar-modelo',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIf, NgFor, FormsModule, ConfirmacionSalidaComponent],
  templateUrl: './editar-modelo.component.html',
  styleUrl: './editar-modelo.component.css'
})
export class EditarModeloComponent implements OnInit {
  modeloId = 0;
  nombre = '';
  descripcion = '';
  //categoria1 = '';
  categorias: any[] = [];
  imagenes: string[] = [];
  imagenesFile: File[] = []; 
  imagenesPreview: string[] = [];
  imagenAmpliada = '';
  intentoGuardar = false;
  mensajeExito = false;
  mostrarModal = false;
  mostrarModalEliminar = false;
  cambiosPendientes = false;
  dragging = false;
  errorImagen = false;
  @ViewChild('inputImagenes') inputImagenes!: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    public loader: LoaderService,
  ) {}

  ngOnInit() {
    this.loader.show();

    this.route.paramMap.subscribe(params => {
      this.modeloId = Number(params.get('id'));
      this.cargarModelo();
    });

    this.http.get<any[]>('https://sastreria-estilo-ljge.onrender.com/api/Categoria').subscribe({
      next: (data) => this.categorias = data
    });
  }

  cargarImagenes(event: any) {
    const files: File[] = Array.from(event.target.files);
    if (this.imagenes.length + files.length > 4) {
      this.errorImagen = true;
      return;
    }
    this.errorImagen = false;
    files.forEach(file => {
      this.imagenesFile.push(file);
      const reader = new FileReader();
      reader.onload = e => this.imagenesPreview.push(e.target?.result as string);
      reader.readAsDataURL(file);
    });
    this.cambiosPendientes = true;
  }

  eliminarImagen(index: number, event?: Event) {
    event?.stopPropagation();

    this.imagenesPreview.splice(index, 1);
    if (index < this.imagenes.length) {
      this.imagenes.splice(index, 1);
    } else {
      this.imagenesFile.splice(index - this.imagenes.length, 1);
    }
    
    this.cambiosPendientes = true;
  }

  clickEnContenedor(event: Event) {
    this.inputImagenes.nativeElement.click();
  }

  evitarComportamientoPorDefecto(event: DragEvent) {
    event.preventDefault();
    this.dragging = event.type === 'dragover';
  }

  manejarDrop(event: DragEvent) {
    this.evitarComportamientoPorDefecto(event);
    if (!event.dataTransfer?.files) return;
    const files = Array.from(event.dataTransfer.files);
    if (this.imagenesPreview.length + files.length > 4) {
      this.errorImagen = true;
      return;
    }
    this.errorImagen = false;

    files.forEach(file => {
      this.imagenesFile.push(file);
      const reader = new FileReader();
      reader.onload = e => this.imagenesPreview.push(e.target?.result as string);
      reader.readAsDataURL(file);
    });
    this.cambiosPendientes = true;
  }

  ampliarImagen(img: string, event?: Event) {
    event?.stopPropagation();
    
    this.imagenAmpliada = img;
  }

  cerrarAmpliacion() {
    this.imagenAmpliada = '';
  }

  cargarModelo() {
    this.http.get<any>('https://sastreria-estilo-ljge.onrender.com/api/Modelo/' + this.modeloId).subscribe({
      next: (data) => {
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.imagenes = data.imagenes || [];
        this.imagenesPreview = [...this.imagenes];
        this.imagenesFile = [];
      },
      complete: () => this.loader.hide()
    });
  }

  async guardarCambios() {
    if (!this.nombre || !this.descripcion || this.imagenes.length === 0) {
      this.intentoGuardar = true;
      return;
    }

    this.loader.show();

    for (const file of this.imagenesFile) {
      const url = await this.subirImagenACloudinary(file);
      this.imagenes.push(url);
    }

    const body = {
      idModelo: this.modeloId,
      nombre: this.nombre,
      descripcion: this.descripcion,
      imagenes: this.imagenes
    };

    this.http.put('https://sastreria-estilo-ljge.onrender.com/api/Modelo/' + this.modeloId, body).subscribe({
      next: () => {
        this.mensajeExito = true;
        this.cambiosPendientes = false;
        this.imagenesFile = [];
      },
      error: (err) => console.error('Error al guardar modelo', err),
      complete: () => this.loader.hide()
    });
  }

  onCambios() {
    this.intentoGuardar = false;
    this.cambiosPendientes = true;
  }

  cancelar() {
    if (this.cambiosPendientes) {
      this.mostrarModal = true;
    } else {
      history.back();
    }
  }

  confirmarSalida() {
    this.mostrarModal = false;
    history.back();
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  async subirImagenACloudinary(file: File): Promise<string> {
    const url = 'https://api.cloudinary.com/v1_1/dirtw0neu/image/upload';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'nombre-generico-para-upload-preset');

    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) throw new Error('Error al subir imagen');
    const data = await response.json();
    return data.secure_url;
  }

  eliminarModelo(): void {
    this.mostrarModalEliminar = true;
  }

  confirmarEliminar() {
    this.mostrarModalEliminar = false;
    this.loader.show();

    this.http
      .delete(`https://sastreria-estilo-ljge.onrender.com/api/Modelo/${this.modeloId}`)
      .subscribe({
        next: () => {
          this.loader.hide();
          this.router.navigate(['/admin/modelos/ver-modelo']);
        },
        error: (err) => {
          console.error('Error al eliminar modelo', err);
          this.loader.hide();
        }
      });
  }

  cancelarEliminar() {
    this.mostrarModalEliminar = false;
  }



}
