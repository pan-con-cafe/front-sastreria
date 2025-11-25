import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChatbotComponent } from '../chatbot/chatbot.component';
import { CommonModule } from '@angular/common';
import { DatoSastreriaService } from '../../shared/services/dato-sastreria.service';

@Component({
  selector: 'app-cliente-contacto',
  standalone: true,
  imports: [NavbarComponent, ChatbotComponent, CommonModule],
  templateUrl: './cliente-contacto.component.html',
  styleUrl: './cliente-contacto.component.css'
})
export class ClienteContactoComponent implements OnInit {
  datos: any = null;

  constructor(private datoService: DatoSastreriaService) {}

  ngOnInit(): void {
    this.datoService.getDato().subscribe({
      next: (res) => this.datos = res,
      error: (err) => console.log(err)
    });
  }
}
