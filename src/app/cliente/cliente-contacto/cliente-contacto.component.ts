import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { CommonModule } from '@angular/common';
import { DatoSastreriaService } from '../../shared/services/dato-sastreria.service';
import { DatoSastreria } from '../../models/dato-sastreria.model';

import { MensajeContactoService } from '../services/mensaje-contacto.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente-contacto',
  standalone: true,
  imports: [NavbarComponent, ChatbotComponent, CommonModule, FormsModule],
  templateUrl: './cliente-contacto.component.html',
  styleUrl: './cliente-contacto.component.css'
})
export class ClienteContactoComponent implements OnInit {
  contacto: DatoSastreria = {
    idDatos: 0,
    nombre: '',
    telefono: '',
    direccion: '',
    descripcion: '',
    logoSastreria: ''
  };

  mensaje = {
    nombre: '',
    email: '',
    asunto: '',
    mensaje: ''
  };

  enviando = false;

  constructor(private datoService: DatoSastreriaService, private mensajeService: MensajeContactoService) {}

  ngOnInit(): void {
    this.datoService.getDato().subscribe({
      next: (data) => {
        if (data.length > 0) {
          this.contacto = data[0];
        }
      },
      error: (err) => console.error('Error al cargar datos', err)
    });
  }

  enviarMensaje() {
    if (!this.mensaje.nombre || !this.mensaje.email || !this.mensaje.mensaje) {
      alert('Completa los campos obligatorios');
      return;
    }

    this.enviando = true;

    this.mensajeService.enviarMensaje(this.mensaje).subscribe({
      next: () => {
        alert('Mensaje enviado correctamente');
        this.mensaje = {
          nombre: '',
          email: '',
          asunto: '',
          mensaje: ''
        };
        this.enviando = false;
      },
      error: (err) => {
        console.error(err);
        alert('Error al enviar el mensaje');
        this.enviando = false;
      }
    });
  }
}
