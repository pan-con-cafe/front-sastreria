import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ver-horario',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-horario.component.html',
  styleUrl: './ver-horario.component.css'
})
export class VerHorarioComponent {
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  horario: string[][] = [];

  ngOnInit(): void {
    const horarioGuardado = localStorage.getItem('horario');
    if (horarioGuardado) {
      this.horario = JSON.parse(horarioGuardado);
    } else {
      this.horario = Array.from({ length: 6 }, () => Array(5).fill('00:00'));
    }
  }
}
