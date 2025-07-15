import { Component, HostListener  } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [RouterLink, CommonModule, NgIf, FormsModule, ConfirmacionSalidaComponent],
  templateUrl: './editar-perfil.component.html',
  styleUrl: './editar-perfil.component.css'
})
export class EditarPerfilComponent {

  logoPreview: string | null = null;
  isDragOver = false;
  cambiosPendientes = false;
  mostrarModal = false;
  mensajeExito = false;
    perfil = {
    nombre: '',
    telefono: '',
    direccion: '',
    descripcion: ''
  };


  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.readFile(file);
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
    if (file && file.type.startsWith('image/')) {
      this.readFile(file);
    }
  }

  private readFile(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onCambios() {
    this.cambiosPendientes = true;
  }

  cancelar() {
    if (this.cambiosPendientes) {
      this.mostrarModal = true;
    } else {
      this.router.navigate(['/admin/general/perfil']); // Cambia esta ruta si tu vista destino es diferente
    }
  }

  confirmarSalida() {
    this.mostrarModal = false;
    this.router.navigate(['/admin/general/perfil']);
  }

  cerrarModal() {
    this.mostrarModal = false;
  }

  @HostListener('window:beforeunload', ['$event'])
  manejarCierreNavegador(event: BeforeUnloadEvent) {
    if (this.cambiosPendientes) {
      event.preventDefault();
      event.returnValue = true;
    }
  }

  guardarCambios() {
    this.mensajeExito = true;
    this.cambiosPendientes = false; // si usas esta lógica

    setTimeout(() => {
      this.mensajeExito = false;
    }, 10000); // 10 segundos visible
  }

  constructor(private router: Router) {}

}
