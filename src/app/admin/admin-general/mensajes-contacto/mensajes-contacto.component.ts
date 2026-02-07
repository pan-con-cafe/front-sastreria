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

}
