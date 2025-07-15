import { Component, ElementRef, ViewChild, HostListener } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';


@Component({
  selector: 'app-editar-modelo',
  standalone: true,
  imports: [CommonModule, RouterLink, NgIf, FormsModule, ConfirmacionSalidaComponent],
  templateUrl: './editar-modelo.component.html',
  styleUrl: './editar-modelo.component.css'
})
export class EditarModeloComponent {

  imagenes: string[] = [];
  imagenPrincipal: string | null = null;
  cambiosPendientes = false;
  mostrarModal = false;
  mensajeExito = false;
  nombre: string = '';
  descripcion: string = '';
  intentoGuardar = false;


  @ViewChild('inputImagen') inputImagen!: ElementRef<HTMLInputElement>;

  seleccionarImagen() {
    this.inputImagen.nativeElement.click();
  }

  cargarImagen(event: Event) {
    const files = (event.target as HTMLInputElement).files;
    if (files && files.length > 0 && this.imagenes.length < 4) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.imagenes.push(result);
        if (!this.imagenPrincipal) {
          this.imagenPrincipal = result;
        }
      };
      reader.readAsDataURL(files[0]);
    }
  }

  cambiarPrincipal(index: number) {
    this.imagenPrincipal = this.imagenes[index];
  }

  eliminarImagen(index: number, event: MouseEvent) {
    event.stopPropagation();
    const eliminado = this.imagenes.splice(index, 1)[0];
    if (this.imagenPrincipal === eliminado) {
      this.imagenPrincipal = this.imagenes[0] || null;
    }
  }

  onCambios() {
    this.cambiosPendientes = true;
  }

  cancelar() {
    if (this.cambiosPendientes) {
      this.mostrarModal = true;
    } else {
      this.router.navigate(['/admin/modelos/ver-modelo']); // Cambia esta ruta si tu vista destino es diferente
    }
  }

  confirmarSalida() {
    this.mostrarModal = false;
    this.router.navigate(['/admin/modelos/ver-modelo']);
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
    this.intentoGuardar = true;

    // Validar manualmente en caso quieras controlar en código también
    if (!this.nombre || !this.descripcion || this.imagenes.length === 0) {
      return;
    }

    this.mensajeExito = true;
    this.cambiosPendientes = false;

    setTimeout(() => {
      this.mensajeExito = false;
    }, 10000);
  }
  constructor(private router: Router) {}

}
