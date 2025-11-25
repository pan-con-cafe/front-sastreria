import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { CommonModule } from '@angular/common';
import { DatoSastreriaService } from '../../shared/services/dato-sastreria.service';
import { DatoSastreria } from '../../models/dato-sastreria.model';

@Component({
  selector: 'app-cliente-contacto',
  standalone: true,
  imports: [NavbarComponent, ChatbotComponent, CommonModule],
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

  constructor(private datoService: DatoSastreriaService) {}

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
}
