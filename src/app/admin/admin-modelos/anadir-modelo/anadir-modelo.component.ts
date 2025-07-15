import { Component , ViewChild, ElementRef, HostListener } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { ConfirmacionSalidaComponent } from '../../../shared/confirmacion-salida/confirmacion-salida.component';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-anadir-modelo',
  standalone: true,
  imports: [RouterLink, NgIf, NgFor, CommonModule, ConfirmacionSalidaComponent, FormsModule],
  templateUrl: './anadir-modelo.component.html',
  styleUrls: ['./anadir-modelo.component.css']
})
export class AnadirModeloComponent {

  imagenesPreview: string[] = [];
  dragging = false;
  errorImagen = false;
  imagenAmpliada: string | null = null;

  cambiosPendientes = false;
  mostrarModal = false;
  mensajeExito = false;
  
  nombre: string = '';
  descripcion: string = '';
  categoria1: string = '';
  categoria2: string = '';
  mensajeError: string = '';
  intentoGuardar = false;



  @ViewChild('inputImagenes') inputImagenesRef!: ElementRef<HTMLInputElement>;

  seleccionarImagen() {
    this.inputImagenesRef.nativeElement.click();
  }

  cargarImagenes(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;
    if (!files) return;

    if (this.imagenesPreview.length >= 4) {
      this.errorImagen = true;
      return;
    }

    let totalActual = this.imagenesPreview.length;

    for (let i = 0; i < files.length; i++) {
      if (totalActual >= 4) {
        this.errorImagen = true;
        break;
      }

      const file = files[i];
      const lector = new FileReader();

      lector.onload = (e: any) => {
        this.imagenesPreview.push(e.target.result);
      };

      lector.readAsDataURL(file);
      totalActual++;
    }

    this.errorImagen = this.imagenesPreview.length > 4;
    input.value = ''; // Permitir subir mismas imágenes nuevamente si se desea
  }


  evitarComportamientoPorDefecto(event: DragEvent) {
    event.preventDefault();
    this.dragging = event.type === 'dragover';
  }

  manejarDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging = false;
    if (event.dataTransfer?.files) {
      const lista = Array.from(event.dataTransfer.files);
      const filtroImagenes = lista.filter(file => file.type.startsWith('image/'));
      const files = new DataTransfer();
      filtroImagenes.forEach(img => files.items.add(img));
      this.cargarImagenes({ target: { files: files.files } } as any);
    }
  }

  eliminarImagen(index: number) {
    this.imagenesPreview.splice(index, 1);
  }

  ampliarImagen(src: string) {
    this.imagenAmpliada = src;
  }

  cerrarAmpliacion() {
    this.imagenAmpliada = null;
  }

  clickEnContenedor(event: MouseEvent) {
    const target = event.target as HTMLElement;

    // Solo abre si se hace clic sobre el propio contenedor o sobre el ícono placeholder
    const esContenedor = target.classList.contains('imagen-placeholder');
    const esPlaceholder = target.tagName === 'IMG' && target.getAttribute('src')?.includes('placeholder');

    if (esContenedor || esPlaceholder) {
      this.seleccionarImagen();
    }
  }

  onCambios() {
    this.cambiosPendientes = true;
  }

  cancelar() {
    if (this.cambiosPendientes) {
      this.mostrarModal = true;
    } else {
      this.router.navigate(['/admin/modelos/ver-modelo']);
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

  guardarModelo() {
    this.intentoGuardar = true;

    if (!this.nombre || !this.descripcion || !this.categoria1 || this.imagenesPreview.length === 0) {
      return; // No guardar si hay errores
    }
    if (this.imagenesPreview.length === 0) {
      this.mensajeError = 'Debe subir al menos una imagen.';
      return;
    }

    this.mensajeError = '';
    this.mensajeExito = true;
    this.cambiosPendientes = false;

    setTimeout(() => {
      this.mensajeExito = false;
    }, 10000);
  }

  constructor(private router: Router) {}
}
