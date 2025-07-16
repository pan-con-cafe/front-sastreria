import { Component, HostListener, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';
import { FormsModule } from '@angular/forms';
import { DatoSastreriaService } from '../services/dato-sastreria.service';
import { DatoSastreria } from '../models/dato-sastreria.model';



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

  logoPreview: string | ArrayBuffer | null = null;
  isDragOver: boolean = false;
  mensajeExito: boolean = false;
  mostrarModal: boolean = false;
  cambiosPendientes: boolean = false;

  @ViewChild('logoInput') logoInput!: ElementRef<HTMLInputElement>;

  constructor(private datoService: DatoSastreriaService, private router: Router) {}

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
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
        this.perfil.logoSastreria = reader.result as string;
        this.cambiosPendientes = true;
      };
      reader.readAsDataURL(file);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragOver = false;
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.logoPreview = reader.result;
        this.perfil.logoSastreria = reader.result as string;
        this.cambiosPendientes = true;
      };
      reader.readAsDataURL(file);
    }
  }

  onCambios(): void {
    this.cambiosPendientes = true;
  }

  guardarCambios(): void {
    this.datoService.updateDato(this.perfil.idDatos, this.perfil).subscribe({
      next: () => {
        this.mensajeExito = true;
        this.cambiosPendientes = false;
        setTimeout(() => this.router.navigate(['/admin/general/perfil']), 1500);
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
