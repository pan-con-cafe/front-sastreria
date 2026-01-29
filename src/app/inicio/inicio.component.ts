import { Component, OnInit  } from '@angular/core';
import { ChatbotComponent } from '../cliente/chatbot/chatbot.component';
import { RouterLink } from '@angular/router';
import { ModeloService } from '../cliente/services/modelo.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ChatbotComponent, RouterLink, NgFor, NgIf],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {

  modelos: any[] = [];
  constructor(private modeloService: ModeloService) {}

  ngOnInit(): void {
    this.cargarModelos();
  }

  cargarModelos() {
    this.modeloService.getModelos().subscribe({
      next: (data) => {
        console.log('Modelos recibidos:', data);
        console.log('Modelo completo:', data[0]);
        console.log('Primera imagen:', data[0].imagenes[0]);
        
        this.modelos = data.slice(0, 5).map(m => ({
        ...m,
          imagenCarrusel: m.imagenes && m.imagenes.length > 0
          ? m.imagenes[0]
          : null
        }));
      },
      error: (err) => {
        console.error('Error al cargar modelos', err);
      }
    });
  }

}
