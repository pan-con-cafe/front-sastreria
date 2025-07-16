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
export class VerHorarioComponent implements OnInit{
  dias: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  horario: string[][] = [];

  constructor(private horarioService: HorarioService) {}

  ngOnInit(): void {
    this.cargarHorario();
  }

  cargarHorario(): void {
    this.horarioService.getHorarios().subscribe({
      next: (data) => {
        this.horario = this.dias.map(dia => {
          const encontrado = data.find(h => h.dia === dia);
          if (encontrado) {
            return [`${encontrado.horaInicio} - ${encontrado.horaFin}`];
          }
          return ['Sin horario'];
        });
      },
      error: (err) => console.error('Error al cargar horario', err)
    });
  }
}
