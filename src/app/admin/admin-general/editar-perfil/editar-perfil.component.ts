import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';
import { FormsModule } from '@angular/forms';
import { DatoSastreriaService } from '../../../shared/services/dato-sastreria.service';
import { DatoSastreria } from '../../../models/dato-sastreria.model';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../../../shared/loader/loader.service';


@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [RouterLink, CommonModule, NgIf, FormsModule, ConfirmacionSalidaComponent],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent implements OnInit {
  perfil: DatoSastreria = {
    idDatos: 0,
    nombre: '',
    telefono: '',
    direccion: '',
    descripcion: '',
    logoSastreria: ''
  };

  logoPreview: string | null = null;
  isDragOver: boolean = false;
  mensajeExito: boolean = false;
  mostrarModal: boolean = false;
  cambiosPendientes: boolean = false;

  @ViewChild('logoInput') logoInput!: ElementRef<HTMLInputElement>;

  constructor(
    private datoService: DatoSastreriaService,
    private router: Router,
    private http: HttpClient,
    public loader: LoaderService,
  ) {}

  ngOnInit(): void {
    this.datoService.getDato().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.perfil = data[0];
          this.logoPreview = this.perfil.logoSastreria;
        }
      },
      error: (err) => console.error('Error al cargar perfil', err)
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.uploadToCloudinary(file);
    }
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      this.uploadToCloudinary(file);
    }
  }

  uploadToCloudinary(file: File): void {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'nombre-generico-para-upload-preset');

    this.http.post(
      'https://api.cloudinary.com/v1_1/dirtw0neu/image/upload',
      formData
    )
    .subscribe({
      next: (res: any) => {
        console.log('Imagen subida', res);
        this.perfil.logoSastreria = res.secure_url;
        this.logoPreview = res.secure_url;
        this.cambiosPendientes = true;
      },
      error: (err) => console.error('Error al subir imagen a Cloudinary', err)
    });
  }


  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onCambios(): void {
    this.cambiosPendientes = true;
  }

  guardarCambios(): void {
    this.datoService.updateDato(this.perfil.idDatos, this.perfil).subscribe({
      next: () => {
        this.mensajeExito = true;
        this.cambiosPendientes = false;
        setTimeout(() => this.router.navigate(['/admin/general/perfil']), 5000);
      },
      error: (err) => console.error('Error al guardar perfil', err)
    });
  }

  cancelar(): void {
    if (this.cambiosPendientes) {
      this.mostrarModal = true;
    } else {
      this.router.navigate(['/admin/general/perfil']);
    }
  }

  confirmarSalida(): void {
    this.router.navigate(['/admin/general/perfil']);
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }
}
