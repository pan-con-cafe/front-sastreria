import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';


@Component({
  selector: 'app-editar-modelo',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIf, FormsModule, ConfirmacionSalidaComponent],
  templateUrl: './editar-modelo.component.html',
  styleUrl: './editar-modelo.component.css'
})
export class EditarModeloComponent implements OnInit {
  modeloId = '';
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
    this.modeloId = this.route.snapshot.paramMap.get('id') || '';
    this.http.get<any>('https://localhost:7057/api/Modelo/' + this.modeloId).subscribe({
      next: (data) => {
        this.nombre = data.nombre;
        this.descripcion = data.descripcion;
        this.categoria1 = data.idCategoria;
        this.imagenes = data.imagenes.map((img: string) => 'https://localhost:7057/Uploads/' + img);
        this.imagenPrincipal = this.imagenes[0];
      }
    });

    this.http.get<any[]>('https://localhost:7057/api/Categoria').subscribe({
      next: (data) => this.categorias = data
    });
  }

  seleccionarImagen() {
    this.inputImagen.nativeElement.click();
  }

  cargarImagen(event: any) {
    const file = event.target.files[0];
    if (!file || this.imagenes.length >= 4) return;
    const reader = new FileReader();
    reader.onload = e => {
      this.imagenes.push(e.target?.result as string);
      this.imagenPrincipal = this.imagenes[0];
    };
    reader.readAsDataURL(file);
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

  guardarCambios() {
    if (!this.nombre || !this.descripcion || !this.categoria1 || this.imagenes.length === 0) {
      this.intentoGuardar = true;
      return;
    }
    const body = {
      idModelo: this.modeloId,
      nombre: this.nombre,
      descripcion: this.descripcion,
      idCategoria: this.categoria1,
      imagenes: this.imagenes.map(img => img.replace('https://localhost:7057/Uploads/', ''))
    };
    this.http.put('https://localhost:7057/api/Modelo/' + this.modeloId, body).subscribe({
      next: () => {
        this.mensajeExito = true;
        this.cambiosPendientes = false;
      }
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
}