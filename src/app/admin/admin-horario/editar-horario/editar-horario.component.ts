import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-horario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-horario.component.html',
  styleUrl: './editar-horario.component.css'
})
export class EditarHorarioComponent {
  dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  horario: string[][] = [];

  ngOnInit(): void {
    const horarioGuardado = localStorage.getItem('horario');
    if (horarioGuardado) {
      this.horario = JSON.parse(horarioGuardado);
    } else {
      // Inicializar con valores por defecto
      this.horario = Array.from({ length: 6 }, () => Array(5).fill('00:00'));
    }
  }

  guardarHorario(): void {
    localStorage.setItem('horario', JSON.stringify(this.horario));
    alert('Horario guardado con éxito');
  }
}