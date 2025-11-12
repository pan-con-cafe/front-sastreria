import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';

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
  categoria1 = '';
  categorias: any[] = [];
  imagenes: string[] = [];
  imagenPrincipal = '';
  intentoGuardar = false;
  mensajeExito = false;
  mostrarModal = false;
  cambiosPendientes = false;

  @ViewChild('inputImagen') inputImagen!: ElementRef<HTMLInputElement>;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.modeloId = Number(params.get('id'));
      this.cargarModelo();
    });

    this.http.get<any[]>('https://sastreria-estilo-ljge.onrender.com/api/Categoria').subscribe({
      next: (data) => this.categorias = data
    });
  }

  cargarModelo() {
    this.http.get<any>('https://sastreria-estilo-ljge.onrender.com/api/Modelo/' + this.modeloId).subscribe({
      next: (data) => {
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.categoria1 = data.idCategoria;
        this.imagenes = data.imagenes || [];
        this.imagenPrincipal = this.imagenes[0] || '';
        console.log('Imagenes cargadas:', this.imagenes);
      }
    });
  }

  seleccionarImagen() {
    this.inputImagen.nativeElement.click();
  }

  async cargarImagen(event: any) {
    const file = event.target.files[0];
    if (!file || this.imagenes.length >= 4) return;

    const url = await this.subirImagenACloudinary(file);
    this.imagenes.push(url);
    this.imagenPrincipal = this.imagenes[0];
    this.cambiosPendientes = true;
  }

  eliminarImagen(index: number, event: Event) {
    event.stopPropagation();
    this.imagenes.splice(index, 1);
    this.imagenPrincipal = this.imagenes[0] || '';
    this.cambiosPendientes = true;
  }

  cambiarPrincipal(index: number) {
    const selected = this.imagenes[index];
    this.imagenPrincipal = selected;
    this.cambiosPendientes = true;
  }

  async guardarCambios() {
    if (!this.nombre || !this.descripcion || !this.categoria1 || this.imagenes.length === 0) {
      this.intentoGuardar = true;
      return;
    }

    const body = {
      idModelo: this.modeloId,
      nombre: this.nombre,
      descripcion: this.descripcion,
      idCategoria: Number(this.categoria1),
      imagenes: this.imagenes
    };

    this.http.put('https://sastreria-estilo-ljge.onrender.com/api/Modelo/' + this.modeloId, body).subscribe({
      next: () => {
        this.mensajeExito = true;
        this.cambiosPendientes = false;
      },
      error: (err) => console.error('Error al guardar modelo', err)
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
}
