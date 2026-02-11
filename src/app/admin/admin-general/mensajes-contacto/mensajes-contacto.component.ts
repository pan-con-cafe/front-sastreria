import { Component, OnInit } from '@angular/core';
import { MensajeContactoService } from '../services/mensaje-contacto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mensajes-contacto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensajes-contacto.component.html',
  styleUrl: './mensajes-contacto.component.css'
})
export class MensajesContactoComponent implements OnInit {

  mensajes: any[] = [];
  cargando = true;
  mensajeSeleccionado: any = null;

  constructor(private mensajeService: MensajeContactoService) {}

  ngOnInit(): void {
    this.mensajeService.obtenerMensajes().subscribe({
      next: (data) => {
        this.mensajes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar mensajes', err);
        this.cargando = false;
      }
    });
  }

  verMensaje(msg: any) {
    this.mensajeSeleccionado = msg;

    if (!msg.leido) {
      this.marcarComoLeido(msg);
    }
  }

  cerrarModal() {
    this.mensajeSeleccionado = null;
      }

  marcarComoLeido(msg: any) {
    this.mensajeService.marcarComoLeido(msg.id).subscribe({
      next: () => msg.leido = true
    });
  }

  mensajeAEliminar: any = null; // mensaje seleccionado para eliminar

  // Click en botón eliminar de la card
  eliminarMensaje(msg: any) {
    this.mensajeAEliminar = msg; // abre el modal
  }

  // Cancelar eliminación
  cancelarEliminar() {
    this.mensajeAEliminar = null;
  }

  // Confirmar eliminación
  confirmarEliminar() {
    if (!this.mensajeAEliminar) return;

    this.mensajeService.eliminarMensaje(this.mensajeAEliminar.id).subscribe({
      next: () => {
        // Eliminar de la lista local
        this.mensajes = this.mensajes.filter(m => m.id !== this.mensajeAEliminar.id);
        this.mensajeAEliminar = null; // cerrar modal
      },
      error: (err) => {
        console.error('Error al eliminar mensaje', err);
        alert('No se pudo eliminar el mensaje'); // opcional, mensaje de error simple
        this.mensajeAEliminar = null;
      }
    });
  }



}
