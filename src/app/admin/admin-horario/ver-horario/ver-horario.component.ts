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
  horario: { texto: string; activo: boolean }[][] = [];

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

        // Ordenar primero por día y luego por hora
        const diasOrden = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const horariosOrdenados = data.sort((a: Horario, b: Horario) => {
          const diaA = diasOrden.indexOf(a.dia);
          const diaB = diasOrden.indexOf(b.dia);

          if (diaA === diaB) {
            return a.horaInicio.localeCompare(b.horaInicio);
          }
          return diaA - diaB;
        });

        this.horario = this.dias.map(dia => {
          const horariosDia = horariosOrdenados
            .filter(h => h.dia === dia)
            .map(h => ({ texto: `${this.formatearHora(h.horaInicio)} - ${this.formatearHora(h.horaFin)}`, activo: h.estado }));
          return horariosDia.length > 0 ? horariosDia : [{ texto: 'Sin horario disponible', activo: false }];
        })
      }
      //error: (err) => console.error('Error al cargar horario', err),
    });
  }

}
