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
        console.log('DATA RAW:', data);
        console.log('ES ARRAY?', Array.isArray(data));
        this.modelos = data
        .sort(
          (a, b) =>
            new Date(b.fechaCreacion).getTime() -
            new Date(a.fechaCreacion).getTime()
        ) 
        .slice(0, 5);
      },
      error: (err) => {
        console.error('Error al cargar modelos', err);
      }
    });
  }
}
