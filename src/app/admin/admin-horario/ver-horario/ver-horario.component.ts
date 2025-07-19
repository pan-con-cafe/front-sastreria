import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HorarioService } from '../services/horario.service';
import { Horario } from '../models/horario.model';

@Component({
  selector: 'app-ver-horario',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-horario.component.html',
  styleUrl: './ver-horario.component.css'
})
export class VerHorarioComponent implements OnInit {
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  horario: string[][] = [];

  constructor(private horarioService: HorarioService) {}

  ngOnInit(): void {
    this.cargarHorario();
  }

  private formatearHora(hora: string): string {
    // Si la hora viene como "16:00:00", extraemos solo "16:00"
    return hora ? hora.substring(0, 5) : '';
  }

  cargarHorario(): void {
    this.horarioService.getHorarios().subscribe({
      next: (data) => {
        this.horario = this.dias.map(dia => {
          const horariosDia = data
            .filter(h => h.dia === dia && h.estado)
            .map(h => `${this.formatearHora(h.horaInicio)} - ${this.formatearHora(h.horaFin)}`);
          return horariosDia.length > 0 ? horariosDia : ['Sin horario disponible'];
        });
      },
      error: (err) => console.error('Error al cargar horario', err)
    });
  }

}
