import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../../shared/loader/loader.service';


@Component({
  selector: 'app-anadir-modelo',
  standalone: true,
  imports: [NgIf, NgFor, CommonModule, ConfirmacionSalidaComponent, FormsModule],
  templateUrl: './anadir-modelo.component.html',
  styleUrls: ['./anadir-modelo.component.css']
})
export class AnadirModeloComponent implements OnInit {
  nombre = '';
  descripcion = '';
  categoriaId = ''; 
  categorias: any[] = [];
  imagenes: File[] = [];
  imagenesPreview: string[] = [];
  mensajeExito = false;
  intentoGuardar = false;
  errorImagen = false;
  mensajeError = '';
  dragging = false;
  imagenAmpliada = '';
  mostrarModal = false;
  cambiosPendientes = false;
  @ViewChild('inputImagenes') inputImagenes!: ElementRef<HTMLInputElement>;

  constructor(
    private http: HttpClient,
    private router: Router,
    public loader: LoaderService,
  ) {}

  ngOnInit() {
    this.http.get<any[]>('https://sastreria-estilo-ljge.onrender.com/api/Categoria').subscribe({
      next: (data) => this.categorias = data
    });
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

  guardarModelo() {
    if (!this.nombre || !this.descripcion || this.imagenes.length === 0) {
      this.intentoGuardar = true;
      return;
    }

    this.loader.show();

    Promise.all(this.imagenes.map(img => this.subirImagenACloudinary(img)))
      .then(urls => {
        const body = {
          nombre: this.nombre,
          descripcion: this.descripcion,
          CategoriasIds: this.categoriaId ? [Number(this.categoriaId)] : [],
          imagenes: urls
        };

        this.http.post('https://sastreria-estilo-ljge.onrender.com/api/Modelo', body).subscribe({
          next: () => {
            this.mensajeExito = true;
            this.cambiosPendientes = false;
            this.nombre = '';
            this.descripcion = '';
            this.categoriaId = '';
            this.imagenes = [];
            this.imagenesPreview = [];

            this.loader.hide();

          },
          error: () => {
            this.mensajeError = 'Hubo un error al guardar el modelo.';
            this.loader.hide();
          }
        });
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
      this.imagenes.push(file);
      const reader = new FileReader();
      reader.onload = e => this.imagenesPreview.push(e.target?.result as string);
      reader.readAsDataURL(file);
    });
    this.cambiosPendientes = true;
  }

  eliminarImagen(index: number) {
    this.imagenes.splice(index, 1);
    this.imagenesPreview.splice(index, 1);
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
    if (this.imagenes.length + files.length > 4) {
      this.errorImagen = true;
      return;
    }
    this.errorImagen = false;
    files.forEach(file => {
      this.imagenes.push(file);
      const reader = new FileReader();
      reader.onload = e => this.imagenesPreview.push(e.target?.result as string);
      reader.readAsDataURL(file);
    });
    this.cambiosPendientes = true;
  }

  ampliarImagen(img: string) {
    this.imagenAmpliada = img;
  }

  cerrarAmpliacion() {
    this.imagenAmpliada = '';
  }

  onCambios() {
    this.intentoGuardar = false;
    this.mensajeError = '';
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
}
