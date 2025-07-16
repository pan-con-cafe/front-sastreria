import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-anadir-modelo',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, CommonModule, ConfirmacionSalidaComponent, FormsModule],
  templateUrl: './anadir-modelo.component.html',
  styleUrls: ['./anadir-modelo.component.css']
})
export class AnadirModeloComponent implements OnInit {
  nombre = '';
  descripcion = '';
  categoria1 = '';
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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any[]>('https://localhost:7057/api/Categoria').subscribe({
      next: (data) => this.categorias = data
    });
  }

  guardarModelo() {
    if (!this.nombre || !this.descripcion || !this.categoria1 || this.imagenes.length === 0) {
      this.intentoGuardar = true;
      return;
    }

    const formData = new FormData();
    formData.append('nombre', this.nombre);
    formData.append('descripcion', this.descripcion);
    formData.append('idCategoria', this.categoria1);
    this.imagenes.forEach(img => formData.append('imagenes', img));

    this.http.post('https://localhost:7057/api/Modelo', formData).subscribe({
      next: () => {
        this.mensajeExito = true;
        this.cambiosPendientes = false;
      },
      error: () => this.mensajeError = 'Hubo un error al guardar el modelo.'
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